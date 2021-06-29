import React, { FC, lazy } from "react";
import { Switch, Route, RouteComponentProps, Redirect } from "react-router-dom";
import { ROUTES } from "./routes";
import BasicLayout from "./layouts/BasicLayout";
import NoUserLayout from "./layouts/NoUserLayout";
import PrivateRoute from "./components/PrivateRoute";
import { useSelector } from "react-redux";
import { RootState } from "./redux/store";

const IndexPage = lazy(() => import("./pages/IndexPage"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const GroupPage = lazy(() => import("./pages/GroupPage"));
const GroupsPage = lazy(() => import("./pages/GroupsPage"));
const ProfilePage = lazy(() => import("./pages/ProfilePage"));
const AboutPage = lazy(() => import("./pages/AboutPage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));

const App: FC = () => {
  const isAuthorized = useSelector((state: RootState) => state.auth.token);

  return (
    <>
      <Switch>
        <Route
          path={ROUTES.LOGIN}
          component={(props: RouteComponentProps<{}, {}, { referer?: string }>) => {
            const page = (
              <NoUserLayout>
                <LoginPage referer={props?.location?.state?.referer} />
              </NoUserLayout>
            );
            return !isAuthorized ? page : <Redirect to={ROUTES.INDEX} />;
          }}
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
};

export default App;
