import React, { FC } from "react";
import clsx from "clsx";

type ButtonVariant = "contained" | "outlined";
type ButtonColor = "primary" | "secondary" | "success" | "warning" | "danger";

interface Props {
  isDisabled?: boolean;
  className?: string;
  variant: ButtonVariant;
  color: ButtonColor;
  type?: "submit" | "reset" | "button";
  [x: string]: any;
}

const Button: FC<Props> = (props) => {
  const { children, className, color, type, isDisabled, ...rest } = props;

  return (
    <button type={type} {...rest} className={clsx(className, "button", "button-" + color)} disabled={isDisabled}>
      {children}
    </button>
  );
};

Button.defaultProps = {
  isDisabled: false,
  className: "",
  type: "button",
};

export default Button;
