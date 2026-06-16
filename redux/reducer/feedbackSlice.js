// src/redux/reducer/feedbackSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { submitFeedback, fetchFeedbacks, removeFeedback  } from "../actions/feedbackAction";

const initialState = {
  // submit
  submitting: false,
  submitted: false,
  lastCreated: null,

  // list
  status: "idle", // idle | loading | succeeded | failed
  error: null,
  items: [],

  // pagination meta (from backend)
  totalPages: 0,
  totalElements: 0,
  pageNumber: 0,
  pageSize: 0,

  // per-row delete state
  deletingMap: {}, // id => true
};

const feedbackSlice = createSlice({
  name: "feedback",
  initialState,
  reducers: {
    resetSubmitState(state) {
      state.submitting = false;
      state.submitted = false;
      state.error = null;
      state.lastCreated = null;
    },
  },
  extraReducers: (builder) => {
    // submit
    builder
      .addCase(submitFeedback.pending, (state) => {
        state.submitting = true;
        state.submitted = false;
        state.error = null;
      })
      .addCase(submitFeedback.fulfilled, (state, action) => {
        state.submitting = false;
        state.submitted = true;
        state.lastCreated = action.payload || null;
        const created = action.payload;
        if (created) {
          // if backend returns the created object, prepend it
          state.items.unshift(created);
          state.totalElements = (state.totalElements || 0) + 1;
        }
      })
      .addCase(submitFeedback.rejected, (state, action) => {
        state.submitting = false;
        state.submitted = false;
        state.error = action.payload || "Submit failed";
      });

    // list
    builder
      .addCase(fetchFeedbacks.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchFeedbacks.fulfilled, (state, action) => {
        state.status = "succeeded";
        const p = action.payload;
        // Accept both array and paged object
        const arr = Array.isArray(p) ? p : (p?.content ?? []);
        state.items = Array.isArray(arr) ? arr : [];

        // Store meta if present
        if (!Array.isArray(p) && p) {
          state.totalPages = p.totalPages ?? 0;
          state.totalElements = p.totalElements ?? state.items.length;
          state.pageNumber = p.number ?? 0;
          state.pageSize = p.size ?? state.items.length;
        } else {
          // Fallback meta
          state.totalPages = 1;
          state.totalElements = state.items.length;
          state.pageNumber = 0;
          state.pageSize = state.items.length;
        }
      })
      .addCase(fetchFeedbacks.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Load failed";
      });

    // delete
    builder
      .addCase(removeFeedback.pending, (state, action) => {
        const id = action.meta.arg;
        if (id) state.deletingMap[id] = true;
      })
      .addCase(removeFeedback.fulfilled, (state, action) => {
        const id = action.payload?.id;
        if (id) {
          delete state.deletingMap[id];
          state.items = state.items.filter((x) => (x.id ?? x._id) !== id);
          state.totalElements = Math.max(0, (state.totalElements || 1) - 1);
        }
      })
      .addCase(removeFeedback.rejected, (state, action) => {
        const id = action.payload?.id || action.meta?.arg;
        if (id) delete state.deletingMap[id];
        state.error = action.payload?.message || "Delete failed";
      });
  },
});

export const { resetSubmitState } = feedbackSlice.actions;
export default feedbackSlice.reducer;

/* Selectors */
export const selectFeedbackItems = (s) => s.feedback.items || [];
export const selectFeedbackStatus = (s) => s.feedback.status || "idle";
export const selectFeedbackError = (s) => s.feedback.error;
export const selectDeletingMap = (s) => s.feedback.deletingMap || {};

// (Optional) pagination selectors
export const selectFeedbackMeta = (s) => ({
  totalPages: s.feedback.totalPages,
  totalElements: s.feedback.totalElements,
  pageNumber: s.feedback.pageNumber,
  pageSize: s.feedback.pageSize,
});
