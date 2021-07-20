import { createUseStyles } from "react-jss";
import { BREAKPOINTS } from "../../shared/constants";

export const useStyles = createUseStyles({
  searchBlock: {
    display: "flex",
    alignItems: "flex-start",
  },
  group: {
    transition: "ease 0.2s",
    width: "49%",
    [`@media (max-width: ${BREAKPOINTS.M}px)`]: {
      width: "100%",
    },
  },
});
