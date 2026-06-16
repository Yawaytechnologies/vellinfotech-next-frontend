import {
  FETCH_BLOG_POSTS_REQUEST,
  FETCH_BLOG_POSTS_SUCCESS,
  FETCH_BLOG_POSTS_FAILURE,
  FETCH_BLOG_POST_BY_ID_REQUEST,
  FETCH_BLOG_POST_BY_ID_SUCCESS,
  FETCH_BLOG_POST_BY_ID_FAILURE,
} from "../actions/blogAction";

const initialState = {
  // list page
  items: [],
  status: "idle",
  error: null,
  fromApi: false,

  // detail page
  selectedPost: null,
  selectedStatus: "idle",
  selectedError: null,
};

export default function blogReducer(state = initialState, action) {
  switch (action.type) {
    /* LIST */
    case FETCH_BLOG_POSTS_REQUEST:
      return {
        ...state,
        status: "loading",
        error: null,
      };
    case FETCH_BLOG_POSTS_SUCCESS:
      return {
        ...state,
        status: "succeeded",
        items: action.payload.items || [],
        fromApi: !!action.payload.fromApi,
      };
    case FETCH_BLOG_POSTS_FAILURE:
      return {
        ...state,
        status: "failed",
        error: action.payload,
      };

    /* DETAIL */
    case FETCH_BLOG_POST_BY_ID_REQUEST:
      return {
        ...state,
        selectedStatus: "loading",
        selectedError: null,
        selectedPost: null,
      };
    case FETCH_BLOG_POST_BY_ID_SUCCESS:
      return {
        ...state,
        selectedStatus: "succeeded",
        selectedPost: action.payload,
      };
    case FETCH_BLOG_POST_BY_ID_FAILURE:
      return {
        ...state,
        selectedStatus: "failed",
        selectedError: action.payload,
        selectedPost: null,
      };

    default:
      return state;
  }
}
