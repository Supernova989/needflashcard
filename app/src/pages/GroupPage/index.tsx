import React, { FC } from "react";
import { RouteComponentProps, useHistory, withRouter } from "react-router-dom";
import Page from "../../components/Page";
import WordSearch from "../../components/WordSearch";
import { getWordURL } from "../../shared/utils";

interface Props {
  id: string;
}

const GroupPage: FC<RouteComponentProps<Props>> = ({ match }) => {
  const {
    params: { id },
  } = match!;

  const history = useHistory();

  return (
    <Page dataTestId={"group-page"}>
      <WordSearch onSelect={(id) => history.push(getWordURL(id))} />I am GroupPage ({id})
    </Page>
  );
};

export default withRouter(GroupPage);
