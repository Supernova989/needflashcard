import React, { FC } from "react";
import clsx from "clsx";
import { useStyles } from "./styles";
import Svg, { SvgName } from "../Svg";

type ButtonVariant = "contained" | "outlined";
type ButtonColor = "primary" | "secondary" | "success" | "warning" | "danger";

interface Props {
  isDisabled?: boolean;
  className?: string;
  startIcon?: SvgName;
  endIcon?: SvgName;
  variant?: ButtonVariant;
  color: ButtonColor;
  onClick?: React.MouseEventHandler;
  type?: "submit" | "reset" | "button";
}

const Button: FC<Props> = (props) => {
  const { children, className, color, onClick, type, startIcon, endIcon, isDisabled, variant } = props;
  const classes = useStyles();

  return (
    <button
      type={type}
      onClick={onClick}
      className={clsx(className, classes.button, color, variant)}
      disabled={isDisabled}
    >
      {startIcon && <Svg className={clsx(classes.svg)} name={startIcon} />}
      {children && (
        <span className={clsx({ [classes.svgLeft]: startIcon, [classes.svgRight]: endIcon })}>{children}</span>
      )}
      {endIcon && <Svg className={clsx(classes.svg)} name={endIcon} />}
    </button>
  );
};

Button.defaultProps = {
  isDisabled: false,
  className: "",
  variant: "contained",
  type: "button",
};

export default Button;
