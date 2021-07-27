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
  variant: ButtonVariant;
  color: ButtonColor;
  type?: "submit" | "reset" | "button";
  [x: string]: any;
}

const Button: FC<Props> = (props) => {
  const { children, className, color, type, startIcon, endIcon, isDisabled, ...rest } = props;
  const classes = useStyles();

  return (
    <button type={type} {...rest} className={clsx(className, classes.button, color)} disabled={isDisabled}>
      {startIcon && <Svg className={clsx(classes.svg, classes.svgLeft)} name={startIcon} />}
      {children}
      {endIcon && <Svg className={clsx(classes.svg, classes.svgRight)} name={endIcon} />}
    </button>
  );
};

Button.defaultProps = {
  isDisabled: false,
  className: "",
  type: "button",
};

export default Button;
