import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { loginUser } from "../../redux/actions/loginAction";
import { signupUser } from "../../redux/actions/signupAction";
import { otpUser } from "../../redux/actions/otpActions";
import ValidationTexts from "../ValidationTexts/ValidationTexts";
import Close from "../../assets/icons/close.svg";
import Tick from "../../assets/icons/tick.svg";

import "./LoginSignup.css";

export default function LoginSignup() {
  const dispatch = useDispatch();
  const history = useHistory();

  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
    otp: "",
  });
  const [submitted, setSubmitted] = useState({
    login: false,
    signup: false,
    otp: false,
  });
  const [passwordValidation, setPasswordValidation] = useState(false);
  const [activeTab, setActiveTab] = useState("signup");
  const [registerSuccess, setRegisterSuccess] = useState(false);

  const reduxState = useSelector((state) => state);

  useEffect(() => {
    if (reduxState.auth.isAuthenticated) {
      history.push("/videoDashboard");
    }
  }, [reduxState.auth.isAuthenticated]);

  useEffect(() => {
    if (
      submitted.signup &&
      reduxState.errors.message === "User already exists. Please login."
    ) {
      alert(reduxState.errors.message);
      setActiveTab("login");
    } else if (
      submitted.signup &&
      reduxState.errors.message ===
        "User not found or password incorrect. Please try again."
    ) {
      alert(reduxState.errors.message);
      setActiveTab("login");
    }
  }, [reduxState.errors]);

  useEffect(() => {
    if (
      submitted.signup &&
      reduxState.auth.registrationSuccess.message ===
        "User created successfully. OTP sent to your email."
    ) {
      alert(reduxState.auth.registrationSuccess.message);
      setRegisterSuccess(true);
      setActiveTab("signup");
    }
  }, [reduxState.auth.registrationSuccess]);

  useEffect(() => {
    updatePasswordValidation();
  }, [credentials.password]);

  function onClickHandler(e) {
    if (e === "login") {
      setActiveTab("login");
    } else if (e === "signup") {
      setActiveTab("signup");
    } else {
      if (activeTab === "login") {
        setSubmitted({ ...submitted, login: true });
        const { email, password } = credentials;
        dispatch(loginUser({ email, password }));
      } else {
        if (registerSuccess) {
          const { email, otp } = credentials;
          dispatch(otpUser({ email, otp }));
        } else if (!submitted.signup) {
          if (passwordValidation) {
            setSubmitted({ ...credentials, signup: true });
            const { email, password } = credentials;
            dispatch(signupUser({ email, password }));
          }
        } else {
          alert("Password must comply with the password rules");
        }
      }
    }
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  }

  function updatePasswordValidation() {
    const lowercaseRegex = /[a-z]/;
    const uppercaseRegex = /[A-Z]/;
    const numericcaseRegex = /[0-9]/;
    if (
      credentials.password.length < 8 ||
      !uppercaseRegex.test(credentials.password) ||
      !numericcaseRegex.test(credentials.password) ||
      !lowercaseRegex.test(credentials.password)
    ) {
      setPasswordValidation(false);
    } else {
      setPasswordValidation(true);
    }
  }

  function checkPasswordValidation(name) {
    const lowercaseRegex = /[a-z]/;
    const uppercaseRegex = /[A-Z]/;
    const numericcaseRegex = /[0-9]/;
    if (name === "eightChars") {
      if (credentials.password.length < 8) {
        return false;
      } else {
        return true;
      }
    }
    if (name === "oneUppercase") {
      if (!uppercaseRegex.test(credentials.password)) {
        return false;
      } else {
        return true;
      }
    }
    if (name === "oneLowercase") {
      if (!lowercaseRegex.test(credentials.password)) {
        return false;
      } else {
        return true;
      }
    }
    if (name === "oneNumeric") {
      if (!numericcaseRegex.test(credentials.password)) {
        return false;
      } else {
        return true;
      }
    }
  }

  function handleButtonNameChange(e) {
    if (activeTab === "signup" && registerSuccess) {
      return "SUBMIT";
    } else if (activeTab === "login") {
      return "LOGIN";
    } else if (activeTab === "signup") {
      return "SIGN UP";
    }
  }

  function handleLabelNameChange() {
    if (activeTab === "login") return "Password";
    else if (activeTab === "signup" && submitted.signup) {
      return "Otp";
    } else {
      return "Password";
    }
  }

  return (
    <div className="loginsignup-main">
      <div className="container-fluid">
        <div className="col-sm-6 sol-md-6 loginsignup-column">
          <div className="loginsignup-company-name text-center">LearnGram</div>
          <div className="loginsignup-box">
            <div className="loginsignup-route-row row">
              <div
                className={`loginsignup-login-tab loginsignup-tab-change ${
                  activeTab === "login" && "loginsignup-active-tab"
                } col-sm-6 col-md-6 text-center`}
                onClick={() => onClickHandler("login")}
              >
                Log In
              </div>
              <div
                className={`loginsignup-signup-tab loginsignup-tab-change ${
                  activeTab === "signup" && "loginsignup-active-tab"
                } col-sm-6 col-md-6 text-center`}
                onClick={() => onClickHandler("signup")}
              >
                Sign Up
              </div>
              <div className="loginsignup-email-input form-group">
                <label>Email</label>
                <input
                  className="form-control"
                  type="email"
                  name="email"
                  onChange={handleChange}
                />
              </div>
              <div className="loginsignup-password-input form-group">
                <label>{handleLabelNameChange()}</label>
                <input
                  className="form-control"
                  type="password"
                  name={registerSuccess ? "otp" : "password"}
                  onChange={handleChange}
                  value={
                    registerSuccess ? credentials.otp : credentials.password
                  }
                />
                {(credentials.password && activeTab === "signup" && !submitted.signup) && (
                  <div className="password-validation-box rounded">
                    <div className="min-eight-chars">
                      <ValidationTexts
                        src={
                          checkPasswordValidation("eightChars") ? Tick : Close
                        }
                        alt="eightChars-close-svg"
                        text="Password should be min 8 chars"
                      />
                    </div>
                    <div className="one-uppercase-letter">
                      <ValidationTexts
                        src={
                          checkPasswordValidation("oneUppercase") ? Tick : Close
                        }
                        alt="oneUppercase-close-svg"
                        text="At least 1 uppercase letter [A-Z]"
                      />
                    </div>
                    <div className="one-lowercase-letter">
                      <ValidationTexts
                        src={
                          checkPasswordValidation("oneLowercase") ? Tick : Close
                        }
                        alt="oneLowercase-close-svg"
                        text="At least 1 lowercase letter [a-z]"
                      />
                    </div>
                    <div className="one-numeric-char">
                      <ValidationTexts
                        src={
                          checkPasswordValidation("oneNumeric") ? Tick : Close
                        }
                        alt="oneNumeric-close-svg"
                        text="At least 1 numeric letter [0-9]"
                      />
                    </div>
                  </div>
                )}
              </div>
              <div className="loginsignup-button text-center">
                <button
                  className="btn btn-primary"
                  onClick={() => onClickHandler()}
                >
                  {handleButtonNameChange()}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
