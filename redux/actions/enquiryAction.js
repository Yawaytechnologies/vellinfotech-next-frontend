// src/redux/actions/enquiryAction.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  postRegistration,
  getRegistrations,
  deleteRegistration as deleteRegistrationSvc,
} from "../service/enquiryService";

export const submitEnquiry = createAsyncThunk(
  "enquiry/submit",
  async (payload, { rejectWithValue, signal }) => {
    try { return await postRegistration(payload, signal); }
    catch (err) {
      const msg = err?.response?.data?.message || err?.response?.data?.error || err?.message || "Request failed";
      return rejectWithValue(msg);
    }
  }
);

export const fetchRegistrations = createAsyncThunk(
  "enquiry/fetchRegistrations",
  async (_, { rejectWithValue, signal }) => {
    try { return await getRegistrations(signal); }
    catch (err) {
      const msg = err?.response?.data?.message || err?.response?.data?.error || err?.message || "Request failed";
      return rejectWithValue(msg);
    }
  }
);

// ✅ NEW
export const removeRegistration = createAsyncThunk(
  "enquiry/removeRegistration",
  async (id, { rejectWithValue, signal }) => {
    try {
      await deleteRegistrationSvc(id, signal);
      return id; // return id to remove from store
    } catch (err) {
      const msg = err?.response?.data?.message || err?.response?.data?.error || err?.message || "Delete failed";
      return rejectWithValue(msg);
    }
  }
);
