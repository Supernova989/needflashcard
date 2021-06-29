import React, { lazy } from "react";
import { Switch, Route, RouteComponentProps } from "react-router-dom";
import { ROUTES } from "./routes";
import BasicLayout from "./layouts/BasicLayout";
import NoUserLayout from "./layouts/NoUserLayout";
import PrivateRoute from "./components/PrivateRoute";

const IndexPage = lazy(() => import("./pages/IndexPage"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const GroupPage = lazy(() => import("./pages/GroupPage"));
const GroupsPage = lazy(() => import("./pages/GroupsPage"));
const ProfilePage = lazy(() => import("./pages/ProfilePage"));
const AboutPage = lazy(() => import("./pages/AboutPage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));

function App() {
  return (
    <>
      <Switch>
        <Route
          path={ROUTES.LOGIN}
          component={(props: RouteComponentProps<{}, {}, { referer?: string }>) => (
            <NoUserLayout>
              <LoginPage referer={props?.location?.state?.referer} />
            </NoUserLayout>
          )}
        />
        <PrivateRoute
          path={ROUTES.INDEX}
          exact
          component={() => (
            <BasicLayout>
              <IndexPage />
            </BasicLayout>
          )}
        />
        <PrivateRoute
          path={ROUTES.GROUP}
          exact
          component={() => (
            <BasicLayout>
              <GroupPage />
            </BasicLayout>
          )}
        />
        <PrivateRoute
          path={ROUTES.GROUPS}
          exact
          component={() => (
            <BasicLayout>
              <GroupsPage />
            </BasicLayout>
          )}
        />
        <PrivateRoute
          path={ROUTES.PROFILE}
          exact
          component={() => (
            <BasicLayout>
              <ProfilePage />
            </BasicLayout>
          )}
        />
        <PrivateRoute
          path={ROUTES.ABOUT}
          exact
          component={() => (
            <BasicLayout>
              <AboutPage />
            </BasicLayout>
          )}
        />
        <Route
          exact
          component={() => (
            <BasicLayout>
              <NotFoundPage />
            </BasicLayout>
          )}
        />
      </Switch>
    </>
  );
}

export default App;
