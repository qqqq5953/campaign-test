import { Btn } from ".";

export default {
  title: "Components/Btn",
  component: Btn,
  argTypes: {
    size: {
      options: ["l", "m", "one"],
      control: { type: "select" },
    },
    type: {
      options: ["qz", "social-btn", "landing-btn"],
      control: { type: "select" },
    },
  },
};

export const Default = {
  args: {
    size: "l",
    pressing: true,
    type: "qz",
    className: {},
    text: "範例文字文字文字（大）",
    divClassName: {},
  },
};
