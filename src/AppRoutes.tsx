import React, { useEffect } from "react";
import { Router, useLocation, Switch } from "react-router-dom";
import { PATH } from "helpers/constant";
import PrivateRoute from "components/Router/PrivateRoute";
import PublicRoute from "components/Router/PublicRoute";
import ForgotPassword from "pages/auth/ForgotPassword";
import ResetPassword from "pages/auth/ResetPassword";
import LoginPage from "pages/auth/LoginPage";
import { history, pushTo } from "helpers/history";
import { subscribingWallet } from "helpers/blockchain";
import NotFoundPage from "pages/layout/organisms/NotFoundPage";
// import UserPage from "pages/user/UserPage";
import UserPage from "pages/user-data/userPage";
import GymPage from "pages/gym/gymPage";
import MerchantPage from "pages/merchant/merchantPage";

const AppRoutes = (): JSX.Element => {
  useEffect(() => {
    subscribingWallet();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const location = useLocation();

  const checkAuth = () => {
    const access = localStorage.getItem("access_token");
    if (access && location.pathname === "/") {
      // return pushTo(PATH.stars);
      return pushTo(PATH.user);
    }
  };

  React.useEffect(() => {
    checkAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Router history={history}>
      <Switch>
        <PublicRoute exact path={PATH.login} component={<LoginPage />} />
        {/* <PrivateRoute
          exact
          path={PATH.user}
          component={<UserPage />}
          
        /> */}
        <PrivateRoute exact path={PATH.user} component={<UserPage />} />
        <PrivateRoute exact path={PATH.gym} component={<GymPage />} />
        <PrivateRoute exact path={PATH.merchant} component={<MerchantPage />} />
        {/* <PrivateRoute
          exact
          path={PATH.manageVersions}
          component={<ManageVersions />}
        /> */}
        <PublicRoute
          exact
          path={PATH.forgotPassword}
          component={<ForgotPassword />}
        />
        <PublicRoute path={PATH.resetPassword} component={<ResetPassword />} />
        <PrivateRoute path="*" component={<NotFoundPage />} />
      </Switch>
    </Router>
  );
};

export default AppRoutes;
