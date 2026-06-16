import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  postInternship,
  getInternships,
  deleteInternship as deleteInternshipSvc,
} from "../service/internshipService";

export const submitInternship = createAsyncThunk(
  "internship/submit",
  async (payload, { rejectWithValue, signal }) => {
    try {
      return await postInternship(payload, signal);
    } catch (err) {
      const msg =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        err?.message ||
        "Request failed";
      return rejectWithValue(msg);
    }
  }
);

export const fetchInternships = createAsyncThunk(
  "internship/fetchAll",
  async (_, { rejectWithValue, signal }) => {
    try {
      return await getInternships(signal);
    } catch (err) {
      const msg =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        err?.message ||
        "Request failed";
      return rejectWithValue(msg);
    }
  }
);

export const removeInternship = createAsyncThunk(
  "internship/remove",
  async (id, { rejectWithValue, signal }) => {
    try {
      await deleteInternshipSvc(id, signal);
      return id;
    } catch (err) {
      const msg =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        err?.message ||
        "Delete failed";
      return rejectWithValue(msg);
    }
  }
);
