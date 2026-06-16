import {
  apiFetchBlogPosts,
  apiFetchBlogPostById,
} from "../service/blogService";

export const FETCH_BLOG_POSTS_REQUEST = "FETCH_BLOG_POSTS_REQUEST";
export const FETCH_BLOG_POSTS_SUCCESS = "FETCH_BLOG_POSTS_SUCCESS";
export const FETCH_BLOG_POSTS_FAILURE = "FETCH_BLOG_POSTS_FAILURE";

export const FETCH_BLOG_POST_BY_ID_REQUEST = "FETCH_BLOG_POST_BY_ID_REQUEST";
export const FETCH_BLOG_POST_BY_ID_SUCCESS = "FETCH_BLOG_POST_BY_ID_SUCCESS";
export const FETCH_BLOG_POST_BY_ID_FAILURE = "FETCH_BLOG_POST_BY_ID_FAILURE";

export const fetchBlogPosts = () => async (dispatch) => {
  try {
    dispatch({ type: FETCH_BLOG_POSTS_REQUEST });
    const items = await apiFetchBlogPosts();
    dispatch({
      type: FETCH_BLOG_POSTS_SUCCESS,
      payload: { items, fromApi: true },
    });
  } catch (err) {
    dispatch({
      type: FETCH_BLOG_POSTS_FAILURE,
      payload: err?.response?.data || err.message,
    });
  }
};

export const fetchBlogPostById = (id) => async (dispatch) => {
  try {
    dispatch({ type: FETCH_BLOG_POST_BY_ID_REQUEST });
    const post = await apiFetchBlogPostById(id);
    if (!post) {
      dispatch({
        type: FETCH_BLOG_POST_BY_ID_FAILURE,
        payload: "Blog not found",
      });
      return;
    }
    dispatch({ type: FETCH_BLOG_POST_BY_ID_SUCCESS, payload: post });
  } catch (err) {
    dispatch({
      type: FETCH_BLOG_POST_BY_ID_FAILURE,
      payload: err?.response?.data || err.message,
    });
  }
};
