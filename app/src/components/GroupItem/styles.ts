import { createUseStyles } from "react-jss";

const SIDE_PADDING = 9;
export const useStyles = createUseStyles({
  root: {
    transition: "ease 0.2s",
    border: "1px solid #c1c1c1",
    padding: SIDE_PADDING,
    height: "100%",
    position: "relative",
    paddingBottom: "2rem",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "#c1e",
    },
  },
  footer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    position: "absolute",
    width: "100%",
    bottom: 5,
    left: 0,
    paddingLeft: SIDE_PADDING,
    paddingRight: SIDE_PADDING,
  },
});
