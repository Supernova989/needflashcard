import { createUseStyles } from "react-jss";

export const useStyles = createUseStyles({
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
    padding: "0.4rem 0.5rem",
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
  autoCompletion: {
    position: "absolute",
    top: "100%",
    zIndex: 5,
    width: "100%",
    backgroundColor: "#FFFFFF",
    border: "1px solid #c1c1c1",
  },
  autoCompletionItem: {
    padding: 5,
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "#ceceec",
    },
  },
});
