// src/redux/actions/feedbackActions.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import { postFeedback, getFeedbacks,deleteFeedback  } from "../service/feedbackService";

export const submitFeedback = createAsyncThunk(
  "feedback/submitFeedback",
  async (payload, { signal, rejectWithValue }) => {
    try {
      const data = await postFeedback(payload, { signal });
      return data; // whatever your API returns (saved object, message, etc.)
    } catch (err) {
      return rejectWithValue(err.message || "Submit failed");
    }
  }
);

// Optional: list feedbacks (admin)
export const fetchFeedbacks = createAsyncThunk(
  "feedback/fetchFeedbacks",
  async (_, { signal, rejectWithValue }) => {
    try {
      const data = await getFeedbacks({ signal }); // paged object
      return data;
    } catch (err) {
      return rejectWithValue(err.message || "Load failed");
    }
  }
);
export const removeFeedback = createAsyncThunk(
  "feedback/removeFeedback",
  async (id, { signal, rejectWithValue }) => {
    try {
      const data = await deleteFeedback(id, { signal });
      return { id, data };
    } catch (err) {
      return rejectWithValue({ id, message: err.message || "Delete failed" });
    }
  }
);
