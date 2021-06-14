import React, { FC } from "react";
import clsx from "clsx";

type ButtonVariant = "contained" | "outlined";
type ButtonColor = "primary" | "secondary" | "success" | "warning" | "danger";

interface Props {
  isDisabled?: boolean,
  className?: string,
  variant: ButtonVariant,
  color: ButtonColor,
}

const Button: FC<Props> = (props) => {
  const { children, className, color } = props;

  return (
    <button type="button" className={clsx(className, "button", "button-" + color)}>
      {children}
    </button>
  );
};


Button.defaultProps = {
  isDisabled: false,
  className: ""
};

export default Button;
