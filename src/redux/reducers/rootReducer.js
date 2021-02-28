import { combineReducers } from "redux";
import errorReducers from "./errorReducers";
import authReducers from "./authReducers";

export default combineReducers({
  auth: authReducers,
  errors: errorReducers,
});
