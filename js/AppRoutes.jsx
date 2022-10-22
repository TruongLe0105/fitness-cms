import React, { useEffect } from "react";
import { Router, useLocation, Switch } from "react-router-dom";
import { PATH } from "helpers/constant";
import PrivateRoute from "components/Router/PrivateRoute";
import PublicRoute from "components/Router/PublicRoute";
import ForgotPassword from "pages/auth/ForgotPassword";
import ResetPassword from "pages/auth/ResetPassword";
import LoginPage from "pages/auth/LoginPage";
import KeywordsPage from "pages/keywords/KeywordsPage";
import StarPage from "pages/stars/StarPage";
import { history, pushTo } from "helpers/history";
import UsersMobilePage from "pages/users-mobile/UsersMobilePage";
import LegalPage from "pages/legal-page/LegalPage";
import DailyReport from "pages/daily-report/DailyReportPage";
import ReferralCodePage from "pages/referral-code/ReferralCodePage";
import NotificationPage from "pages/notifications/NotificationPage";
import FeePage from "pages/fee/FeePage";
import SettingPage from "pages/setting/SettingPage";
import EventPage from "pages/event/EventPage";
import ReportPage from "pages/reports/ReportPage";
import { subscribingWallet } from "helpers/blockchain";
import NotFoundPage from "pages/layout/organisms/NotFoundPage";
import TreasurePage from "pages/treasure/TreasurePage";
import AdvertisementPage from "pages/advertisement/Advertisement";
// import UserPage from "pages/user/UserPage";
import UserCharacterPage from "pages/user-character/UserCharacterPage";
import UserPage from "pages/user-data/userPage";
import RewardHistoryPage from "pages/reward-history/RewardHistoryPage";
import SingleGameHistoryPage from "pages/single-game-history/SingleGameHistoryPage";
import VsGameHistoryPage from "pages/vs-game-history/VsGameHistoryPage";
import TransactionPage from "pages/transaction/TransactionPage";
import CharacterPage from "pages/character/CharacterPage";
import DownloadPage from "pages/download/Download";
import VersionPage from "pages/version/VersionPage";
const AppRoutes = () => {
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
    return (<Router history={history}>
      <Switch>
        <PrivateRoute exact path={PATH.dailyReport} component={<DailyReport />}/>
        <PrivateRoute exact path={PATH.stars} component={<StarPage />}/>
        <PrivateRoute exact path={PATH.keywords} component={<KeywordsPage />}/>
        <PrivateRoute exact path={PATH.mobileUsers} component={<UsersMobilePage />}/>
        <PublicRoute exact path={PATH.login} component={<LoginPage />}/>
        <PrivateRoute exact path={PATH.legalPage} component={<LegalPage />}/>
        <PrivateRoute exact path={PATH.referralCode} component={<ReferralCodePage />}/>
        <PrivateRoute exact path={PATH.notifications} component={<NotificationPage />}/>
        {/* <PrivateRoute
          exact
          path={PATH.user}
          component={<UserPage />}
          
        /> */}
        <PrivateRoute exact path={PATH.user} component={<UserPage />}/>
        <PrivateRoute exact path={PATH.userCharacter} component={<UserCharacterPage />}/>
        <PrivateRoute exact path={PATH.rewardHistory} component={<RewardHistoryPage />}/>
        <PrivateRoute exact path={PATH.singleGameHistory} component={<SingleGameHistoryPage />}/>
        <PrivateRoute exact path={PATH.battleGameHistory} component={<VsGameHistoryPage />}/>
        <PrivateRoute exact path={PATH.transaction} component={<TransactionPage />}/>
        <PrivateRoute exact path={PATH.character} component={<CharacterPage />}/>
        <PrivateRoute exact path={PATH.download} component={<DownloadPage />}/>
        <PrivateRoute exact path={PATH.version} component={<VersionPage />}/>
        {/* <PrivateRoute
          exact
          path={PATH.manageVersions}
          component={<ManageVersions />}
        /> */}
        <PrivateRoute exact path={PATH.settings} component={<SettingPage />}/>
        <PrivateRoute exact path={PATH.events} component={<EventPage />}/>
        <PrivateRoute exact path={PATH.reports} component={<ReportPage />}/>
        <PrivateRoute exact path={PATH.treasure} component={<TreasurePage />}/>
        <PrivateRoute exact path={PATH.advertisement} component={<AdvertisementPage />}/>
        <PrivateRoute exact path={PATH.fee} component={<FeePage />}/>
        <PublicRoute exact path={PATH.forgotPassword} component={<ForgotPassword />}/>
        <PublicRoute path={PATH.resetPassword} component={<ResetPassword />}/>
        <PrivateRoute path="*" component={<NotFoundPage />}/>
      </Switch>
    </Router>);
};
export default AppRoutes;
