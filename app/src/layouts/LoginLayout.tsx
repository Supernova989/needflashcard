import React, { FC } from "react";
import { Suspense } from "react";
import PageLoadFallback from "../components/PageLoadFallback";
import { createUseStyles } from "react-jss";
import bgImage from "../assets/img/bg1.jpg";

const useStyles = createUseStyles({
  bg: {
    backgroundImage: `url(${bgImage})`,
    backgroundSize: "contain",
    position: "fixed",
    zIndex: -1,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    filter: "blur(3px)",
    opacity: 0.9,
  },
});

const LoginLayout: FC = ({ children }) => {
  const classes = useStyles();
  return (
    <>
      <div className={classes.bg} />
      <header></header>
      <main>
        <Suspense fallback={<PageLoadFallback />}>{children}</Suspense>
      </main>
      <footer></footer>
    </>
  );
};

export default LoginLayout;
