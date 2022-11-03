import React from "react";
import { Route, Redirect } from "react-router-dom";
import { isLogin } from "config/environments";
import { PATH } from "helpers/constant";

// eslint-disable-next-line
const PublicRoute = ({ component: Component, ...rest }: any): JSX.Element => {
  return (
    <Route
      {...rest}
      render={() => (!isLogin() ? Component : <Redirect to={PATH.login} />)}
    />
  );
};

export default PublicRoute;
