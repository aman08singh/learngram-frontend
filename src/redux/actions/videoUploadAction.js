import axios from "axios";
import { GET_ERRORS, SET_VIDEO_UPLOAD_SUCCESS } from "./types";
import { setCurrentUser } from "./loginAction";
import { eraseCookie } from "../../utils/Cookie";
import { VIDEO_UPLOAD } from "../../endpoints";

import setAuthToken from "../../utils/setAuthToken";

export const videoUpload = (userData) => (dispatch) => {
  axios
    .post(VIDEO_UPLOAD, userData)
    .then((res) => {
      dispatch(setVideoUploadSuccess(res.data));
    })
    .catch((err) => {
      dispatch(setVideoUploadError(err.response.data));
    });
};

//Set Logged in user
export const setVideoUploadSuccess = (decoded) => {
  return {
    type: SET_VIDEO_UPLOAD_SUCCESS,
    payload: decoded,
  };
};

//User logout
export const setUserLogout = () => (dispatch) => {
  eraseCookie("jwtToken");
  eraseCookie("user");
  setAuthToken(false);
  dispatch(setCurrentUser({}));
};

//Set Log in error
export const setVideoUploadError = (decoded) => {
  return {
    type: GET_ERRORS,
    payload: decoded,
  };
};
