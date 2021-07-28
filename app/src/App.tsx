import React, { FC, lazy } from "react";
import { Switch, Route, RouteComponentProps, Redirect } from "react-router-dom";
import { ROUTES } from "./routes";
import BasicLayout from "./layouts/BasicLayout";
import LoginLayout from "./layouts/LoginLayout";
import PrivateRoute from "./components/PrivateRoute";
import { useSelector } from "react-redux";
import { RootState } from "./redux/store";

const LoginPage = lazy(() => import("./pages/LoginPage"));
const RegisterPage = lazy(() => import("./pages/RegisterPage"));
const ForgotPage = lazy(() => import("./pages/ForgotPage"));
const IndexPage = lazy(() => import("./pages/IndexPage"));
const ProfilePage = lazy(() => import("./pages/ProfilePage"));
const GroupPage = lazy(() => import("./pages/GroupPage"));
const GroupsPage = lazy(() => import("./pages/GroupsPage"));
const WordPage = lazy(() => import("./pages/WordPage"));
const WordSearchResultPage = lazy(() => import("./pages/WordSearchResultPage"));
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
              <LoginLayout>
                <LoginPage referer={props?.location?.state?.referer} />
              </LoginLayout>
            );
            return !isAuthorized ? page : <Redirect to={ROUTES.INDEX} />;
          }}
        />
        <Route
          path={ROUTES.REGISTER}
          exact
          component={() => (
            <LoginLayout>
              <RegisterPage />
            </LoginLayout>
          )}
        />
        <Route
          path={ROUTES.FORGOT_PASSWORD}
          exact
          component={() => (
            <LoginLayout>
              <ForgotPage />
            </LoginLayout>
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
          path={ROUTES.WORD_SEARCH}
          exact
          component={() => (
            <BasicLayout>
              <WordSearchResultPage />
            </BasicLayout>
          )}
        />
        <PrivateRoute
          path={ROUTES.WORD}
          exact
          component={() => (
            <BasicLayout>
              <WordPage />
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
            <BasicLayout disableMenu={true}>
              <NotFoundPage />
            </BasicLayout>
          )}
        />
      </Switch>
    </>
  );
};

export default App;
