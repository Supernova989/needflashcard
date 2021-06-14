import { FC } from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";

interface Props {
  id: string;
}

const GroupPage: FC<RouteComponentProps<Props>> = ({ match }) => {
  const { params: { id } } = match!;
  
  return (
    <div>
      I am GroupPage ({id})
    </div>
  );
};

export default withRouter(GroupPage);
