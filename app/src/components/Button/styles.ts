import { createUseStyles } from "react-jss";

export const useStyles = createUseStyles({
  button: {
    transition: ".2s ease",
    borderWidth: 1,
    display: "inline-flex",
    flexShrink: 0,
    alignItems: "center",
    paddingTop: "0.5rem",
    paddingRight: "0.5rem",
    paddingBottom: "0.5rem",
    paddingLeft: "0.5rem",
    cursor: "pointer",
    "&:disabled": {
      cursor: "default",
      color: "#a5a5a5 !important",
      backgroundColor: "#cecece !important",
    },
    "&.primary": {
      color: "#FFFFFF",
      backgroundColor: "#4366ff",
      "&:hover": {
        backgroundColor: "#2d44b1",
      },
    },
  },
  svg: {
    width: 15,
    height: 15,
  },
  svgLeft: {
    marginRight: 7,
  },
  svgRight: {
    marginLeft: 7,
  },
});
