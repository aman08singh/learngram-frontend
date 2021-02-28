import React, { useState, useEffect } from "react";
import { Provider } from "react-redux";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import store from "./redux/store/store";
import "./App.css";
import LoginSignup from "./components/LoginSignup/LoginSignup";
import VideoDashboard from "./components/VideoDashboard/VideoDashboard";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser } from "./redux/actions/loginAction";
import { getCookie } from "./utils/Cookie";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    if (getCookie("jwtToken")) {
      const loggedInUser = getCookie("user");
      const foundUser = JSON.parse(loggedInUser);
      const token = getCookie("jwtToken");
      setAuthToken(token);
      dispatch(setCurrentUser(foundUser));
    }
  }, []);

  return (
    <div className="App">
      <Router>
        <Route exact path="/" component={LoginSignup} />
        <Switch>
          <PrivateRoute
            exact
            path="/videoDashboard"
            component={VideoDashboard}
          />
        </Switch>
        <Redirect from="*" to="/" />
      </Router>
    </div>
  );
}

export default App;
