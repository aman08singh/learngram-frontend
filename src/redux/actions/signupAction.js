import axios from "axios";
import { GET_ERRORS, SET_SIGNUP_SUCCESS } from "./types";

export const signupUser = (userData) => (dispatch) => {
  axios
    .post(
      "http://frontend-assignment.learngram.ai/api/v1/user/signup",
      userData
    )
    .then((res) => {})
    .catch((err) => {
      dispatch(setSignupError(err.response.data));
    });
};

export const setSignupSuccess = (decoded) => {
  return {
    type: SET_SIGNUP_SUCCESS,
    payload: decoded,
  };
};

export const setSignupError = (decoded) => {
  return {
    type: GET_ERRORS,
    payload: decoded,
  };
};
