import React, { useEffect, useRef, useState } from "react";
import { createUseStyles } from "react-jss";
import clsx from "clsx";

const TIMEOUT_MS = 500;

const useStyles = createUseStyles({
  root: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "50vh",
  },
  wrap: {
    width: 200,
    height: 200,
    color: "#2a617b",
  },
  svg: {
    animationName: "scale-in",
    animationDuration: "300ms",
    animationTimingFunction: "linear",
  },
  fragment: {
    transformOrigin: "center",
    animationName: "revolve",
    animationDuration: "2s",
    animationTimingFunction: "linear",
    animationIterationCount: "infinite",
  },
});

const PageLoadFallback = () => {
  const classes = useStyles();
  const [show, setShow] = useState<boolean>(false);
  const ti = useRef<unknown>();

  useEffect(() => {
    ti.current = setInterval(() => setShow(true), TIMEOUT_MS);
    return () => {
      if (ti && ti.current) {
        clearInterval(ti.current as number);
      }
    };
  }, []);

  if (!show) {
    return null;
  }

  return (
    <div className={classes.root}>
      <div className={classes.wrap}>
        <svg
          className={clsx("spinner", classes.svg)}
          version="1.1"
          id="L7"
          xmlns="http://www.w3.org/2000/svg"
          x="0"
          y="0"
          viewBox="0 0 100 100"
          enableBackground="new 0 0 100 100"
        >
          <path
            className={classes.fragment}
            fill="currentcolor"
            d="M31.6,3.5C5.9,13.6-6.6,42.7,3.5,68.4c10.1,25.7,39.2,38.3,64.9,28.1l-3.1-7.9c-21.3,8.4-45.4-2-53.8-23.3 c-8.4-21.3,2-45.4,23.3-53.8L31.6,3.5z"
          />
          <path
            className={classes.fragment}
            fill="currentcolor"
            d="M42.3,39.6c5.7-4.3,13.9-3.1,18.1,2.7c4.3,5.7,3.1,13.9-2.7,18.1l4.1,5.5c8.8-6.5,10.6-19,4.1-27.7 c-6.5-8.8-19-10.6-27.7-4.1L42.3,39.6z"
          />
          <path
            className={classes.fragment}
            fill="currentcolor"
            d="M82,35.7C74.1,18,53.4,10.1,35.7,18S10.1,46.6,18,64.3l7.6-3.4c-6-13.5,0-29.3,13.5-35.3s29.3,0,35.3,13.5 L82,35.7z"
          />
        </svg>
      </div>
    </div>
  );
};

export default PageLoadFallback;
