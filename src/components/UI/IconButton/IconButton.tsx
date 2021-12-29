import React, { ReactNode } from "react";

type IconButtonProps = {
  icon?: ReactNode;
  title?: string;
  children: ReactNode;
  onClick: () => void;
  style?: "contained" | "outlined" | "flat";
};

const IconButton: React.FC<IconButtonProps> = ({
  icon,
  title,
  onClick,
  style = "flat",
  children,
}) => {
  return (
    <button
      className={`button button_icon button_${style}`}
      aria-label={title}
      title={title}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default IconButton;
