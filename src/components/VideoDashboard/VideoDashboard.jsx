import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { listVideo } from "../../redux/actions/listVideosAction";
import {
  videoUpload,
  setUserLogout,
} from "../../redux/actions/videoUploadAction";
import { getCookie } from "../../utils/Cookie";
import "./VideoDashboard.css";

export default function VideoDashboard() {
  const dispatch = useDispatch();
  const reduxState = useSelector((state) => state);

  const [files, setFiles] = useState();
  const [videoList, setVideoList] = useState();
  const [searchTerm, setSearchTerm] = useState("");

  if (!getCookie("jwtToken")) {
    window.location.href = "./";
  }

  useEffect(() => {
    dispatch(listVideo);
  }, []);

  useEffect(() => {
    setVideoList(reduxState.auth.videoList.videos);
  }, [reduxState.auth.videoList]);

  useEffect(() => {
    setVideoList(reduxState.auth.videoUploadSuccess.videos);
  }, [reduxState.auth.videoUploadSuccess]);

  function onFileChange(e) {
    setFiles(e.target.files[0]);
  }

  function UploadButtonClick() {
    if (files) {
      const formData = new FormData();
      formData.append("file", files);
      dispatch(videoUpload(formData));
    }
  }

  function handleLogoutButtonClick() {
    dispatch(setUserLogout());
  }

  function searchingFor(term) {
    return function (x) {
      return x.fileName.toLowerCase().includes(term.toLowerCase()) || !term;
    };
  }

  function videoRender() {
    return videoList ? (
      videoList.filter(searchingFor(searchTerm)).map((item, index) => {
        return (
          <div className="col-sm-12 col-md-6 video-div-column" key={index}>
            <video width="100%" height="360" controls src={item.location} />
          </div>
        );
      })
    ) : (
      <div>Loading</div>
    );
  }

  function searchTermHandler(e) {
    const { value } = e.target;
    setSearchTerm(value);
  }

  return (
    <div className="main">
      <div className="header">
        <div className="header-title">Economics 101</div>
        <hr />
      </div>
      <div className="container">
        <div className="row flex-wrap-reverse upload-file-logout-row">
          <div className="col-sm-12 col-md-6 custom-file">
            <input
              className="rounded custom-file-input file-input-field"
              id="customFile"
              type="file"
              onChange={onFileChange}
            />
            <button
              className="btn btn-primary upload-button"
              onClick={() => UploadButtonClick()}
            >
              Upload Lecture
            </button>
          </div>
          <div className="col-sm-12 col-md-6">
            <button
              className="btn btn-primary logout-button"
              onClick={() => handleLogoutButtonClick()}
            >
              Log Out
            </button>
          </div>
        </div>
        <div className="video-feature-div">
          <video className="video-feature" controls></video>
        </div>
        <div className="video-feature-title-div">
          <div className="video-feature-title">Lecture 1</div>
        </div>
        <div className="video-search-input-div form-group">
          <input
            className="form-control rounded video-search-input"
            placeholder="Search"
            onChange={searchTermHandler}
            type="text"
          />
        </div>
        <div className="video-list">
          <div className="row">{videoRender()}</div>
        </div>
      </div>
    </div>
  );
}
