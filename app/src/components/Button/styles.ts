import { createUseStyles } from "react-jss";

export const useStyles = createUseStyles({
  button: {
    appearance: "none",
    userSelect: "none",
    transition: ".2s ease",
    borderWidth: 1,
    borderColor: "inherit",
    borderStyle: "solid",
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
      "&.contained": {
        color: "#FFFFFF",
        backgroundColor: "#4366ff",
        borderColor: "#4366ff",
        "&:hover": {
          backgroundColor: "#2d44b1",
          borderColor: "#2d44b1",
        },
      },
      "&.outlined": {
        color: "#4366ff",
        backgroundColor: "#FFFFFF00",
        borderColor: "#000000",
        "&:hover": {
          color: "#FFFFFF",
          backgroundColor: "#2d44b1",
          borderColor: "#2d44b1",
        },
      },
    },
    "&.secondary": {
      "&.contained": {
        color: "#FFFFFF",
        backgroundColor: "#000000",
        borderColor: "#000000",
        "&:hover": {
          color: "#000000",
          backgroundColor: "#FFFFFF",
        },
      },
      "&.outlined": {
        color: "#000000",
        backgroundColor: "#FFFFFF00",
        borderColor: "#000000",
        "&:hover": {
          color: "#FFFFFF",
          backgroundColor: "#000000",
        },
      },
    },
  },
  svg: {
    width: 15,
    height: 15,
  },
  svgLeft: {
    marginLeft: 7,
  },
  svgRight: {
    marginRight: 7,
  },
});
