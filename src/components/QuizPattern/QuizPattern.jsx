/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import React from "react";
import { Btn } from "../Btn";
import { Quiznum } from "../Quiznum";
import "./style.css";

export const QuizPattern = ({ className }) => {
  return (
    <div className={`quiz-pattern ${className}`}>
      <div className="quiz">
        <Quiznum className="quiznum-instance" quiz="one" />
        <div className="title-answer">
          <div className="titlecontent">你最怕遇到的雷隊友 ？</div>
          <div className="answer-container">
            <Btn className="btn-instance" pressing={false} size="l" text="整天抱怨工作太多的小明" type="qz" />
            <Btn
              className="btn-instance"
              divClassName="design-component-instance-node"
              pressing={false}
              size="l"
              text="在背後八卦別人閒事的花花"
              type="qz"
            />
            <Btn
              className="btn-instance"
              divClassName="design-component-instance-node"
              pressing={false}
              size="l"
              text="到處摸魚等下班回家的阿倫"
              type="qz"
            />
            <Btn className="btn-instance" pressing={false} size="l" text="整天抱怨工作太多的小明" type="qz" />
          </div>
        </div>
      </div>
    </div>
  );
};
