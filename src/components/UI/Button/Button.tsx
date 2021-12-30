import React, { ReactNode } from "react";
import "./button.scss";

export interface ButtonProps {
  onClick?: () => void;
  type?: "contained" | "outlined" | "flat";
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
  type = "outlined",
  leftIcon,
  rightIcon,
}) => {
  return (
    <button className={`button button_${type}`} onClick={onClick}>
      {leftIcon}
      {text}
      {rightIcon}
    </button>
  );
};

export default Button;
