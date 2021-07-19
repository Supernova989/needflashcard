import { FC } from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import Page from "../../components/Page";

interface Props {
  id: string;
}

const GroupPage: FC<RouteComponentProps<Props>> = ({ match }) => {
  const {
    params: { id },
  } = match!;

  return <Page dataTestId={"group-page"}>I am GroupPage ({id})</Page>;
};

export default withRouter(GroupPage);
