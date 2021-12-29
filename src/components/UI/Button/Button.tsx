import React, { ReactNode } from "react";
import "./button.scss";

export interface ButtonProps {
  onClick?: () => void;
  style?: "contained" | "outlined" | "flat";
  children?: ReactNode;
}

type NormalButtonProps = ButtonProps & {
  text: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
};

const Button: React.FC<NormalButtonProps> = ({
  text,
  onClick,
  style = "outlined",
  leftIcon,
  rightIcon,
}) => {
  return (
    <button className={`button button_${style}`} onClick={onClick}>
      {leftIcon}
      {text}
      {rightIcon}
    </button>
  );
};

export default Button;
