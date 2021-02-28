import axios from "axios";
import { GET_ERRORS, SET_VIDEO_SUCCESS } from "./types";
import { LIST_VIDEOS } from "../../endpoints";

export const listVideo = (dispatch) => {
  axios
    .get(LIST_VIDEOS)
    .then((res) => {
      dispatch(setVideoSuccess(res.data));
    })
    .catch((err) => {
      dispatch(setVideoError(err.response.data));
    });
};

export const setVideoSuccess = (decoded) => {
  return {
    type: SET_VIDEO_SUCCESS,
    payload: decoded,
  };
};

export const setVideoError = (decoded) => {
  return {
    type: GET_ERRORS,
    payload: decoded,
  };
};
