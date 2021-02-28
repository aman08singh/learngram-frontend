import axios from "axios";
import { GET_ERRORS, SET_SIGNUP_SUCCESS } from "./types";
import { USER_SIGNUP } from "../../endpoints";

export const signupUser = (userData) => (dispatch) => {
  axios
    .post(USER_SIGNUP, userData)
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
