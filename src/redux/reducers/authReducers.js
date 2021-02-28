import {
  SET_CURRENT_USER,
  USER_LOADING,
  SET_SIGNUP_SUCCESS,
  SET_VIDEO_SUCCESS,
  SET_VIDEO_UPLOAD_SUCCESS,
} from "../actions/types";

const initialState = {
  isAuthenticated: false,
  user: {},
  loading: false,
  registrationSuccess: {},
  videoList: [],
  videoUploadSuccess: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: action.payload !== "" && action.payload,
        user: action.payload,
      };
    case SET_SIGNUP_SUCCESS:
      return {
        ...state,
        registrationSuccess: action.payload,
      };
    case SET_VIDEO_SUCCESS:
      return {
        ...state,
        videoList: action.payload,
      };
    case SET_VIDEO_UPLOAD_SUCCESS:
      return {
        ...state,
        videoUploadSuccess: action.payload,
      };
    case USER_LOADING:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
}
