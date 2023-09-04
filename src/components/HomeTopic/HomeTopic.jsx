/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import PropTypes from "prop-types";
import React from "react";
import "./style.css";

export const HomeTopic = ({
  className,
  dialog = "https://anima-uploads.s3.amazonaws.com/projects/64dc7dc3c024ed42c1e5eb56/releases/64eebb8166c047808fd6981d/img/dialog-1@2x.png",
  title = "https://anima-uploads.s3.amazonaws.com/projects/64dc7dc3c024ed42c1e5eb56/releases/64eebb8166c047808fd6981d/img/title-1@2x.png",
  content = "https://anima-uploads.s3.amazonaws.com/projects/64dc7dc3c024ed42c1e5eb56/releases/64eebb8166c047808fd6981d/img/content-1@2x.png",
  landingBtn = "https://anima-uploads.s3.amazonaws.com/projects/64dc7dc3c024ed42c1e5eb56/releases/64eebb8166c047808fd6981d/img/landing-btn-1-1@2x.png",
}) => {
  return (
    <div className={`home-topic ${className}`}>
      <div className="frame">
        <div className="div">
          <img className="dialog" alt="Dialog" src={dialog} />
          <img className="title" alt="Title" src={title} />
        </div>
        <img className="content" alt="Content" src={content} />
      </div>
      <img className="landing-btn" alt="Landing btn" src={landingBtn} />
    </div>
  );
};

HomeTopic.propTypes = {
  dialog: PropTypes.string,
  title: PropTypes.string,
  content: PropTypes.string,
  landingBtn: PropTypes.string,
};
