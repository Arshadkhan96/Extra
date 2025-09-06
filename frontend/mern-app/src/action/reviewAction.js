// actions/reviewAction.js

import axios from "axios";
import {
  NEW_REVIEW_REQUEST,
  NEW_REVIEW_SUCCESS,
  NEW_REVIEW_FAIL,
  CLEAR_ERRORS,
} from "../constants/reviewConstant";

// Submit a new review
export const newReview = (reviewData) => async (dispatch, getState) => {
  try {
    dispatch({ type: NEW_REVIEW_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getState().userLogin?.userInfo?.token}`, // if using JWT auth
      },
    };

    const { data } = await axios.put(`http://localhost:5000/api/v1/review/`, reviewData, config);

    dispatch({
      type: NEW_REVIEW_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: NEW_REVIEW_FAIL,
      payload: error.response?.data.message || error.message,
    });
  }
};

// Clear Errors
export const clearErrors = () => (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};

