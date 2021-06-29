import React, { ElementType, FC, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Redirect, Route, RouteComponentProps, RouteProps, withRouter } from "react-router-dom";
import { RootState } from "../../redux/store";
import { ROUTES } from "../../routes";

interface PrivateRouteProps {
  component: ElementType;
}

const PrivateRoute: FC<PrivateRouteProps & RouteProps & RouteComponentProps> = ({ component: Component, ...rest }) => {
  const authState = useSelector((state: RootState) => state.auth);
  const [isAuthenticated, setAuthenticated] = useState<boolean>(!!authState.token);

  useEffect(() => {
    if (isAuthenticated !== !!authState.token) {
      setAuthenticated(!!authState.token);
    }
  }, [authState.token]);

  const render = (props: any) => {
    return isAuthenticated ? (
      <Component {...props} />
    ) : (
      <Redirect to={{ pathname: ROUTES.LOGIN, state: { referer: props.location.pathname } }} />
    );
  };

  return <Route {...rest} render={(props) => render(props)} />;
};

export default withRouter(PrivateRoute);
