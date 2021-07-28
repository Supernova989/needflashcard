import { createUseStyles } from "react-jss";
import { BREAKPOINTS } from "../../shared/constants";

export const useStyles = createUseStyles({
  group: {
    transition: "ease 0.2s",
    width: "49%",
    [`@media (max-width: ${BREAKPOINTS.M}px)`]: {
      width: "100%",
    },
  },
});
