import { createUseStyles } from "react-jss";

export const useStyles = createUseStyles({
  button: {
    transition: ".2s ease",
    borderWidth: 1,
    paddingTop: "0.5rem",
    paddingRight: "0.5rem",
    paddingBottom: "0.5rem",
    paddingLeft: "0.5rem",
    cursor: "pointer",
    "&:disabled": {
      cursor: "default",
    },
    "&.primary": {
      color: "#FFFFFF",
      backgroundColor: "#4366ff",
      "&:hover": {
        backgroundColor: "#2d44b1",
      },
    },
  },
});
