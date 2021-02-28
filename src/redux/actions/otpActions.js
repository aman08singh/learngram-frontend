import axios from "axios";
import { GET_ERRORS, SET_CURRENT_USER, USER_LOADING } from "./types";
import { setCookie } from "../../utils/Cookie";

import setAuthToken from "../../utils/setAuthToken";

export const otpUser = (userData) => (dispatch) => {
  axios
    .post(
      "http://frontend-assignment.learngram.ai/api/v1/user/verifyotp",
      userData
    )
    .then((res) => {
      const { jwt } = res.data;
      const { user } = res.data;
      setCookie("jwtToken", jwt, 1);
      setAuthToken(jwt);
      dispatch(setCurrentUser(user));
      dispatch(setOtpError(false));
    })
    .catch((err) => {
      dispatch(setOtpError(err.response.data));
    });
};

//Set Logged in user
export const setCurrentUser = (decoded) => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded,
  };
};

//User loading
export const setUserLoading = () => {
  return {
    type: USER_LOADING,
  };
};

//Set Log in error
export const setOtpError = (decoded) => {
  return {
    type: GET_ERRORS,
    payload: decoded,
  };
};
