// src/redux/reducers/jobReducer.js
import {
  FETCH_JOBS_REQUEST,
  FETCH_JOBS_SUCCESS,
  FETCH_JOBS_FAILURE,
  SET_SELECTED_JOB,
  APPLY_JOB_REQUEST,
  APPLY_JOB_SUCCESS,
  APPLY_JOB_FAILURE,
  CLEAR_APPLY_STATUS,
} from "../actions/jobActions";

const initialState = {
  items: [],
  loading: false,
  error: null,
  selectedJobId: null,

  applying: false,
  applyError: null,
  applySuccessMessage: null,
};

export default function jobReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_JOBS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_JOBS_SUCCESS:
      return {
        ...state,
        loading: false,
        items: action.payload,
        error: null,
      };
    case FETCH_JOBS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case SET_SELECTED_JOB:
      return {
        ...state,
        selectedJobId: action.payload,
      };

    case APPLY_JOB_REQUEST:
      return {
        ...state,
        applying: true,
        applyError: null,
        applySuccessMessage: null,
      };
    case APPLY_JOB_SUCCESS:
      return {
        ...state,
        applying: false,
        applySuccessMessage: action.payload,
        applyError: null,
      };
    case APPLY_JOB_FAILURE:
      return {
        ...state,
        applying: false,
        applyError: action.payload,
        applySuccessMessage: null,
      };
    case CLEAR_APPLY_STATUS:
      return {
        ...state,
        applyError: null,
        applySuccessMessage: null,
      };

    default:
      return state;
  }
}
