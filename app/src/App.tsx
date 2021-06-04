import React, { lazy } from "react";
import { Router, Switch, Route, RouteComponentProps } from "react-router-dom";
import history from "./history";
import { ROUTES } from "./routes";
import BasicLayout from "./layouts/BasicLayout";
import NoUserLayout from "./layouts/NoUserLayout";
import PrivateRoute from "./components/PrivateRoute";


const IndexPage = lazy(() => import("./pages/IndexPage"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const GroupPage = lazy(() => import("./pages/GroupPage"));
const AboutPage = lazy(() => import("./pages/AboutPage"));

function App() {
  return <>
    <Router history={history}>
      <Switch>
        <Route path={ROUTES.LOGIN} component={(props: RouteComponentProps<{}, {}, { referer?: string }>) =>
                 <NoUserLayout>
                   <LoginPage referer={props?.location?.state?.referer} />
                 </NoUserLayout>}
        />
        <PrivateRoute path={ROUTES.INDEX} exact component={() => <BasicLayout><IndexPage /></BasicLayout>} />
        <PrivateRoute path={ROUTES.GROUP} exact component={() => <BasicLayout><GroupPage /></BasicLayout>} />
        <PrivateRoute path={ROUTES.ABOUT} exact component={() => <BasicLayout><AboutPage /></BasicLayout>} />
      </Switch>
    </Router>
  </>;
}

export default App;
