import { createSlice } from "@reduxjs/toolkit";
import {
  submitInternship,
  fetchInternships,
  removeInternship,
} from "../actions/internshipAction";

const initialState = {
  status: "idle",
  error: null,
  last: null,
  list: {
    items: [],
    status: "idle",
    error: null,
    deleting: {},
  },
};

const internshipSlice = createSlice({
  name: "internship",
  initialState,
  reducers: {
    resetInternshipState: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitInternship.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(submitInternship.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.last = action.payload;
      })
      .addCase(submitInternship.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Something went wrong";
      });

    builder
      .addCase(fetchInternships.pending, (state) => {
        state.list.status = "loading";
        state.list.error = null;
      })
      .addCase(fetchInternships.fulfilled, (state, action) => {
        state.list.status = "succeeded";
        state.list.items = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(fetchInternships.rejected, (state, action) => {
        state.list.status = "failed";
        state.list.error = action.payload || "Failed to fetch internships";
      });

    builder
      .addCase(removeInternship.pending, (state, action) => {
        state.list.deleting[action.meta.arg] = true;
      })
      .addCase(removeInternship.fulfilled, (state, action) => {
        const id = action.payload;
        state.list.items = state.list.items.filter((r) => r.id !== id);
        delete state.list.deleting[id];
      })
      .addCase(removeInternship.rejected, (state, action) => {
        delete state.list.deleting[action.meta.arg];
        state.list.error = action.payload || "Delete failed";
      });
  },
});

export const { resetInternshipState } = internshipSlice.actions;
export default internshipSlice.reducer;

export const selectInternshipStatus = (s) => s.internship.status;
export const selectInternshipError = (s) => s.internship.error;
export const selectInternships = (s) => s.internship.list.items;
export const selectInternshipListStatus = (s) => s.internship.list.status;
