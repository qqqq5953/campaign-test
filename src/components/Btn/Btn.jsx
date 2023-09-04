/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import PropTypes from "prop-types";
import React from "react";
import { SocialIcon } from "../../icons/SocialIcon";
import "./style.css";

export const Btn = ({ size, pressing, type, className, text = "範例文字文字文字（大）", divClassName }) => {
  return (
    <div className={`btn size-${size} ${type} pressing-${pressing} ${className}`}>
      {type === "qz" && (
        <div className={`div ${divClassName}`}>
          {size === "m" && !pressing && <>範例文字文字文字（小）</>}

          {pressing && size === "m" && <>text-btn</>}

          {size === "l" && <>{text}</>}
        </div>
      )}

      {type === "social-btn" && (
        <>
          <SocialIcon className="social-icon" />
          <div className="content">instagram</div>
        </>
      )}
    </div>
  );
};

Btn.propTypes = {
  size: PropTypes.oneOf(["l", "m", "one"]),
  pressing: PropTypes.bool,
  type: PropTypes.oneOf(["qz", "social-btn", "landing-btn"]),
  text: PropTypes.string,
};
