import { FC, forwardRef } from "react";
import clsx from "clsx";
import { useStyles } from "./styles";
import { SearchWordSuggestion } from "../../redux/reducers/@wordSearch/interfaces";
import { Suggestion } from "../../shared/models";

interface Props {
  name: string;
  type?: "text" | "password" | "email";
  label?: string;
  id?: string;
  value?: string;
  error?: string;
  maxLength?: number;
  disabled?: boolean;
  className?: string;
  touched?: boolean;
  block?: boolean;
  autoCompletion?: {
    list: Suggestion[];
    onSelect: (value: string) => void;
  };
  testId?: string;
  [s: string]: any;
}

const Input = forwardRef<HTMLDivElement, Props>((props, ref) => {
  const {
    name,
    id,
    maxLength,
    block,
    touched,
    autoCompletion,
    testId,
    disabled,
    className,
    error,
    type,
    value,
    label,
    ...rest
  } = props;
  const classes = useStyles();

  const autoCompletionList = (
    <div className={clsx(classes.autoCompletion)}>
      {autoCompletion?.list.map((suggestion, i) => {
        return (
          <div
            key={suggestion.id}
            onClick={autoCompletion.onSelect?.bind(null, suggestion.id)}
            className={classes.autoCompletionItem}
          >
            {suggestion.title}
          </div>
        );
      })}
    </div>
  );

  return (
    <div ref={ref} className={clsx(className, classes.root, { [classes.block]: block })}>
      <div className={clsx("relative", classes.block)}>
        <input
          autoCorrect="off"
          autoComplete="off"
          id={id}
          maxLength={maxLength}
          placeholder={label}
          className={clsx(classes.input, { [classes.notEmpty]: value?.length })}
          name={name}
          type={type}
          value={value}
          data-testid={testId}
          disabled={disabled}
          {...rest}
        />
        {autoCompletion && autoCompletion?.list.length > 0 && autoCompletionList}
      </div>
      {touched && error && error.trim() && <span className={clsx(classes.error)}>{error}</span>}
    </div>
  );
});

Input.defaultProps = {
  type: "text",
};

export default Input;
