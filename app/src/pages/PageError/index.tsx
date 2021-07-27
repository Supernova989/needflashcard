import React, { FC } from "react";
import { useTranslation } from "react-i18next";
import img from "../../assets/img/something-went-wrong.png";
import clsx from "clsx";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "fixed",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    background: "#FFFFFF",
  },
  wrap: {
    width: 750,
    maxWidth: "90%",
    margin: "auto",
  },
  textCenter: {
    textAlign: "center",
  },
  textJustify: {
    textAlign: "justify",
  },
  text: {
    color: "#3E3E3E",
    margin: "2rem 0 0 0",
  },
});

const ErrorPage: FC = () => {
  const classes = useStyles();
  const { t } = useTranslation();
  return (
    <>
      <div className={classes.root}>
        <div className={clsx(classes.wrap, classes.textCenter)}>
          <img src={img} alt={"error occurred"} />

          <hr />

          {t("PAGE_ERROR.HEADING")}

          <div className={clsx(classes.textJustify, classes.text)}>{t("PAGE_ERROR.TEXT")}</div>
        </div>
      </div>
    </>
  );
};

export default ErrorPage;
