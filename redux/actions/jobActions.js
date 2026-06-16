// src/redux/actions/jobActions.js
import { fetchJobsApi, applyJobApi } from "../service/jobService";

// Action types
export const FETCH_JOBS_REQUEST = "FETCH_JOBS_REQUEST";
export const FETCH_JOBS_SUCCESS = "FETCH_JOBS_SUCCESS";
export const FETCH_JOBS_FAILURE = "FETCH_JOBS_FAILURE";

export const SET_SELECTED_JOB = "SET_SELECTED_JOB";

export const APPLY_JOB_REQUEST = "APPLY_JOB_REQUEST";
export const APPLY_JOB_SUCCESS = "APPLY_JOB_SUCCESS";
export const APPLY_JOB_FAILURE = "APPLY_JOB_FAILURE";
export const CLEAR_APPLY_STATUS = "CLEAR_APPLY_STATUS";

// Action creators
const fetchJobsRequest = () => ({ type: FETCH_JOBS_REQUEST });
const fetchJobsSuccess = (jobs) => ({
  type: FETCH_JOBS_SUCCESS,
  payload: jobs,
});
const fetchJobsFailure = (error) => ({
  type: FETCH_JOBS_FAILURE,
  payload: error,
});

export const setSelectedJob = (jobId) => ({
  type: SET_SELECTED_JOB,
  payload: jobId,
});

const applyJobRequest = () => ({ type: APPLY_JOB_REQUEST });
const applyJobSuccess = (message) => ({
  type: APPLY_JOB_SUCCESS,
  payload: message,
});
const applyJobFailure = (error) => ({
  type: APPLY_JOB_FAILURE,
  payload: error,
});

export const clearApplyStatus = () => ({ type: CLEAR_APPLY_STATUS });

/* -------------------- Thunks -------------------- */

// Load jobs
export const fetchJobs = () => async (dispatch) => {
  try {
    dispatch(fetchJobsRequest());
    const jobs = await fetchJobsApi(); // Fetch jobs via service
    dispatch(fetchJobsSuccess(jobs));

    if (jobs && jobs.length > 0) {
      // Optional: select first job by default
      dispatch(setSelectedJob(jobs[0].id));
    }
  } catch (err) {
    dispatch(
      fetchJobsFailure(err.message || "Failed to load jobs from server")
    );
  }
};

// Apply for a job – payload is JSON object
export const applyForJob = (jobId, payload) => async (dispatch) => {
  try {
    dispatch(applyJobRequest());
    const data = await applyJobApi(jobId, payload);
    const msg = data?.message || "Application submitted successfully.";
    dispatch(applyJobSuccess(msg));
  } catch (err) {
    dispatch(
      applyJobFailure(
        err.response?.data?.message ||
          err.response?.data?.error ||
          err.message ||
          "Failed to submit application"
      )
    );
  }
};
