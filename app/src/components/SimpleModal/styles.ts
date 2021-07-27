import { createUseStyles } from "react-jss";

export const ANIMATION_DURATION = 400;
export const ANIMATION_DURATION_SAFE = ANIMATION_DURATION - 30;

export const useStyles = createUseStyles({
  overlayBackground: {
    background: "rgba(0,0,0,.25)",
    position: "fixed",
    zIndex: 11,
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    "&.opening": {
      animation: "fade-in",
      animationDuration: ANIMATION_DURATION,
    },
    "&.closing": {
      animation: "fade-out",
      animationDuration: ANIMATION_DURATION,
    },
  },
  overlayLayout: {
    position: "fixed",
    zIndex: 1000,
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    position: "relative",
    background: "#FFFFFF",
    zIndex: 10,
    maxWidth: "90%",
    width: 800,
    "&.opening": {
      animation: "slide-down-in",
      animationDuration: ANIMATION_DURATION,
    },
    "&.closing": {
      animation: "slide-up-out",
      animationDuration: ANIMATION_DURATION,
    },
  },
  modalHeader: {
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: "#000000",
    color: "#FFFFFF",
  },
  headerText: {},
  modalBody: {
    padding: "0.9rem 1.2rem",
  },
  modalFooter: {
    paddingTop: 10,
    paddingBottom: 10,
  },
  container: {
    paddingLeft: 15,
    paddingRight: 15,
  },
});
