import React, { FC } from "react";
import clsx from "clsx";

interface Props {
  isDisabled?: boolean,
  className?: string,
}

const Button: FC<Props> = (props) => {
  const { children, className } = props;
  return (
    <button className={clsx(className,)}>
      {children}
    </button>
  );
};


Button.defaultProps = {
  isDisabled: false,
  className: ""
};

export default Button;
