import React from "react";
import { HomeTopic } from "../../components/HomeTopic";
import "./style.css";

export const Index = () => {
  return (
    <div className="index">
      <div className="overlap-group-wrapper">
        <div className="overlap-group">
          <div className="background-normal">
            <img
              className="img"
              alt="Background normal"
              src="https://anima-uploads.s3.amazonaws.com/projects/64dc7dc3c024ed42c1e5eb56/releases/64e5bb6acde608a2857356ee/img/background-normal--1.png"
            />
          </div>
          <HomeTopic
            className="home-topic-instance"
            content="https://anima-uploads.s3.amazonaws.com/projects/64dc7dc3c024ed42c1e5eb56/releases/64eebb8166c047808fd6981d/img/content@2x.png"
            dialog="https://anima-uploads.s3.amazonaws.com/projects/64dc7dc3c024ed42c1e5eb56/releases/64eebb8166c047808fd6981d/img/dialog@2x.png"
            landingBtn="https://anima-uploads.s3.amazonaws.com/projects/64dc7dc3c024ed42c1e5eb56/releases/64eebb8166c047808fd6981d/img/landing-btn-1@2x.png"
            title="https://anima-uploads.s3.amazonaws.com/projects/64dc7dc3c024ed42c1e5eb56/releases/64eebb8166c047808fd6981d/img/title@2x.png"
          />
        </div>
      </div>
    </div>
  );
};
