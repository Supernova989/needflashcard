import { FC } from "react";
import { useStyles } from "./styles";
import clsx from "clsx";

interface Props {
  heading?: string;
  dataTestId?: string;
}

const Page: FC<Props> = ({ children, dataTestId, heading }) => {
  const classes = useStyles();
  return (
    <>
      {heading && <h1>{heading}</h1>}
      <div data-testid={dataTestId} className={clsx(classes.padding, classes.content)}>
        {children}
      </div>
    </>
  );
};

export default Page;
