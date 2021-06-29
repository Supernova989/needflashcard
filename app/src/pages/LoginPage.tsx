import { FC, useEffect } from "react";

interface Props {
  referer?: string;
}

const LoginPage: FC<Props> = ({ referer }) => {
  useEffect(() => {
    if (referer) {
      console.log("referer ==>", referer);
    }
  }, []);
  return <div>I am LoginPage. {referer}</div>;
};

export default LoginPage;
