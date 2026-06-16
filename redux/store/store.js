// src/redux/store/store.js
import { configureStore } from '@reduxjs/toolkit';
import enquiryReducer from '../reducer/enquirySlice';
import feedbackReducer from '../reducer/feedbackSlice';
import jobReducer from "../reducer/jobReducer";
import blogReducer from "../reducer/blogSlice";
import internshipReducer from "../reducer/internshipSlice";
export const store = configureStore({
  reducer: {
    enquiry: enquiryReducer,
    feedback:     feedbackReducer,
    jobs: jobReducer,


    blog: blogReducer,
    internship: internshipReducer,
  },
});
