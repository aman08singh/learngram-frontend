import axios from "axios";
import { GET_ERRORS, SET_CURRENT_USER, USER_LOADING } from "./types";
import { setCookie } from "../../utils/Cookie";
import { USER_LOGIN } from "../../endpoints";

import setAuthToken from "../../utils/setAuthToken";

export const loginUser = (userData) => (dispatch) => {
  axios
    .post(USER_LOGIN, userData)
    .then((res) => {
      const { jwt } = res.data;
      const { user } = res.data;
      setCookie("user", JSON.stringify(user), 1);
      setCookie("jwtToken", jwt, 1);
      setAuthToken(jwt);
      dispatch(setCurrentUser(user));
      dispatch(setLoginError(false));
    })
    .catch((err) => {
      dispatch(setLoginError(err.response.data));
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
export const setLoginError = (decoded) => {
  return {
    type: GET_ERRORS,
    payload: decoded,
  };
};
