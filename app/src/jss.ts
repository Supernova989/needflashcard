import { jss } from "react-jss";
import { generateToken } from "./shared/utils";

const createGenerateId = () => {
  let counter = 0;
  return () => `jss-${generateToken(6)}-${counter++}`;
};

jss.setup({ createGenerateId: createGenerateId });
