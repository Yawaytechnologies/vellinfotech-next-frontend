// Reducer slice to track submission status and last result
// ============================================================================
import { createSlice } from "@reduxjs/toolkit";
import { submitEnquiry, fetchRegistrations, removeRegistration } from "../actions/enquiryAction";

const initialState = {
  status: "idle",
  error: null,
  last: null,
  list: {
    items: [],
    status: "idle",
    error: null,
    deleting: {}, // ✅ track per-row deleting: { [id]: true }
  },
};

const enquirySlice = createSlice({
  name: "enquiry",
  initialState,
  reducers: {
    resetEnquiryState: () => initialState,
    clearEnquiryError: (state) => { state.error = null; },
    clearRegistrations(state) {
      state.list.items = [];
      state.list.status = "idle";
      state.list.error = null;
      state.list.deleting = {};
    },
  },
  extraReducers: (builder) => {
    // submit (unchanged)
    builder
      .addCase(submitEnquiry.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(submitEnquiry.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.last = action.payload;
      })
      .addCase(submitEnquiry.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Something went wrong";
      });

    // list (get)
    builder
      .addCase(fetchRegistrations.pending, (state) => {
        state.list.status = "loading";
        state.list.error = null;
      })
      .addCase(fetchRegistrations.fulfilled, (state, action) => {
        state.list.status = "succeeded";
        state.list.items = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(fetchRegistrations.rejected, (state, action) => {
        state.list.status = "failed";
        state.list.error = action.payload || "Failed to fetch registrations";
      });

    // ✅ delete handlers
    builder
      .addCase(removeRegistration.pending, (state, action) => {
        const id = action.meta.arg;
        state.list.deleting[id] = true;
      })
      .addCase(removeRegistration.fulfilled, (state, action) => {
        const id = action.payload;
        state.list.items = state.list.items.filter(r => (r.id || r._id) !== id);
        delete state.list.deleting[id];
      })
      .addCase(removeRegistration.rejected, (state, action) => {
        const id = action.meta.arg;
        delete state.list.deleting[id];
        state.list.error = action.payload || action.error?.message || "Delete failed";
      });
  },
});

export const {
  resetEnquiryState,
  clearEnquiryError,
  clearRegistrations,
} = enquirySlice.actions;

export default enquirySlice.reducer;

// selectors
export const selectEnquiryStatus = (s) => s.enquiry.status;
export const selectEnquiryError  = (s) => s.enquiry.error;

export const selectRegistrations = (s) => s.enquiry.list.items;
export const selectRegStatus     = (s) => s.enquiry.list.status;
export const selectRegError      = (s) => s.enquiry.list.error;
export const selectDeletingMap   = (s) => s.enquiry.list.deleting; // ✅
