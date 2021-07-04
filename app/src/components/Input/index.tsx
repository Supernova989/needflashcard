import { FC } from "react";
import clsx from "clsx";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  root: {
    display: "inline-flex",
    alignItems: "center",
    transition: "ease-out 250ms",
    position: "relative",
    paddingBottom: "1.1rem",
  },
  input: {
    fontSize: "100%",
    display: "block",
    width: "100%",
    appearance: "none",
    backgroundColor: "#FFFFFF",
    padding: "0.2rem 0.4rem",
    outline: "none",
    border: "1px solid rgba(0, 0, 0, .43)",
    "&:hover": {
      border: "1px solid rgba(0, 0, 0, .7)",
    },
    "&:disabled": {
      border: "1px solid rgba(0, 0, 0, .3)",
    },
    "&:focus": {
      border: "1px solid rgba(0, 0, 0, .9)",
    },
  },
  error: {
    display: "block",
    color: "#c10000",
    fontSize: "75%",
    lineHeight: 1.1,
    marginBottom: 3,
    paddingLeft: 3,
    paddingRight: 3,
    position: "absolute",
    bottom: 0,
    width: "100%",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  notEmpty: {
    border: "1px solid rgba(0, 0, 0, .9)",
  },
  block: {
    width: "100%",
  },
});

interface Props {
  name: string;
  label?: string;
  id?: string;
  value?: string;
  error?: string;
  disabled?: boolean;
  className?: string;
  touched?: boolean;
  block?: boolean;
  type?: "text" | "password" | "email";
  testId?: string;
  [s: string]: any;
}

const Input: FC<Props> = (props) => {
  const { name, id, block, touched, testId, disabled, className, error, type, value, label, ...rest } = props;
  const classes = useStyles();

  return (
    <div className={clsx(className, classes.root, { [classes.block]: block })}>
      <div className={clsx(classes.block)}>
        <input
          autoCorrect="off"
          autoComplete="off"
          id={id}
          placeholder={label}
          className={clsx(classes.input, { [classes.notEmpty]: value?.length })}
          name={name}
          type={type}
          value={value}
          data-testid={testId}
          disabled={disabled}
          {...rest}
        />
      </div>
      {touched && error && error.trim() && <span className={clsx(classes.error)}>{error}</span>}
    </div>
  );
};

Input.defaultProps = {
  type: "text",
};

export default Input;
