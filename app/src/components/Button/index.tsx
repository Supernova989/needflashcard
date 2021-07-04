import React, { FC } from "react";
import clsx from "clsx";
import { createUseStyles } from "react-jss";

type ButtonVariant = "contained" | "outlined";
type ButtonColor = "primary" | "secondary" | "success" | "warning" | "danger";

const useStyles = createUseStyles({
  button: {
    paddingTop: "0.2rem",
    paddingRight: "0.5rem",
    paddingBottom: "0.2rem",
    paddingLeft: "0.5rem",
  },
});

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
  const classes = useStyles();

  return (
    <button
      type={type}
      {...rest}
      className={clsx(className, classes.button, "button", "button-" + color)}
      disabled={isDisabled}
    >
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
