import { QuizNum } from ".";

export default {
  title: "Components/QuizNum",
  component: QuizNum,
  argTypes: {
    quiz: {
      options: [ "one", "two", "three", "four", "five", "six","seven" , "eight", "nine", "ten"],
      control: { type: "select" },
    },
  },
};

export const Default = {
  args: {
    quiz: "one",
    className: {},
  },
};
