import { FC, useEffect } from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";

interface Props {
  referer?: string
}

const LoginPage: FC<Props> = ({referer}) => {
  useEffect(() => {
    if (referer) {
  
      console.log("referer ==>",referer);
    }
  }, []);
  return (
    <div>
      I am LoginPage. {referer}
    </div>
  );
};

export default LoginPage;
