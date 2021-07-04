import React, { FC, lazy } from "react";
import { Switch, Route, RouteComponentProps, Redirect } from "react-router-dom";
import { ROUTES } from "./routes";
import BasicLayout from "./layouts/BasicLayout";
import NoUserLayout from "./layouts/NoUserLayout";
import PrivateRoute from "./components/PrivateRoute";
import { useSelector } from "react-redux";
import { RootState } from "./redux/store";
import LoginLayout from "./layouts/LoginLayout";
import AboutPage from "./pages/AboutPage";
import ForgotPage from "./pages/ForgotPage";

const IndexPage = lazy(() => import("./pages/IndexPage"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const GroupPage = lazy(() => import("./pages/GroupPage"));
const GroupsPage = lazy(() => import("./pages/GroupsPage"));
const ProfilePage = lazy(() => import("./pages/ProfilePage"));
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
              <LoginLayout>
                <LoginPage referer={props?.location?.state?.referer} />
              </LoginLayout>
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
        <Route
          path={ROUTES.ABOUT}
          exact
          component={() => (
            <NoUserLayout>
              <AboutPage />
            </NoUserLayout>
          )}
        />
        <Route
          path={ROUTES.FORGOT_PASSWORD}
          exact
          component={() => (
            <NoUserLayout>
              <ForgotPage />
            </NoUserLayout>
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
