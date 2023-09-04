import React from "react";
import { QuizPattern } from "../../../components/QuizPattern";
import "./style.css";

export const Index = () => {
  return (
    <div className="index">
      <div className="overlap-group-wrapper">
        <div className="overlap-group">
          <QuizPattern className="quiz-pattern-instance" />
        </div>
      </div>
    </div>
  );
};
