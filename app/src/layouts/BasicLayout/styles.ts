import { createUseStyles } from "react-jss";

export const MOBILE_MENU_WIDTH = 230;
export const MOBILE_MENU_ANIMATION_DURATION = 250;

export const useStyles = createUseStyles({
  header: {
    backgroundColor: "#000000",
    color: "#FFFFFF",
  },
  menuButton: {
    width: 20,
    height: 22.8,
    color: "inherit",
    cursor: "pointer",
    transition: `ease 200ms`,
    "&:hover": {
      color: "#878787",
    },
  },
  clickAwayListener: {
    zIndex: 9,
    position: "fixed",
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    cursor: "pointer",
  },
  mobileMenu: {
    zIndex: 10,
    transition: `ease ${MOBILE_MENU_ANIMATION_DURATION}ms`,
    position: "fixed",
    width: MOBILE_MENU_WIDTH,
    background: "#f6f6ff",
    padding: 10,
    opacity: 0,
    height: "100vh",
    transform: `translateX(-${MOBILE_MENU_WIDTH}px)`,
  },
  menuOpen: {
    opacity: 1,
    transform: `translateX(0)`,
  },
});
