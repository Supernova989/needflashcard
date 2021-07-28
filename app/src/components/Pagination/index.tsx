import React, { FC } from "react";
import { createUseStyles } from "react-jss";

interface Props {
  total: number;
  current: number;
  showMin?: number;
}

const useStyles = createUseStyles({
  root: {
    display: "inline-flex",
    justifyContent: "space-between",
  },
});
const Pagination: FC<Props> = ({ total, current }) => {
  const gap = 4;
  const safe = 10;

  let output: any[] = [];

  if (total <= safe) {
    output = Array.from({ length: total }, (v, i) => i);
  } else {
    if (current <= gap) {
      output = Array.from({ length: gap }, (v, i) => i);
      output.push("...");
      output = output.concat(Array.from({ length: gap }, (v, i) => total - gap + i));
    } else if (current > gap && total - gap > current - 1) {
      const half = Math.floor(gap / 2);
      output = [0];
      output.push("...");
      output = output.concat(Array.from({ length: half }, (v, i) => current - half + i));
      output.push(current);
      output = output.concat(Array.from({ length: half }, (v, i) => current + i + 1));
      output.push("...");
      output.push(total);
    } else {
      output = [0];
      output.push("...");
      output = output.concat(Array.from({ length: gap }, (v, i) => total - gap + i));
    }
  }

  return (
    <span>
      {output.map((i) => (
        <>
          <span key={i}>{Number.isInteger(i) ? i + 1 : i}</span>
          &nbsp;
        </>
      ))}
    </span>
  );
};

export default Pagination;
