import Typography from "components/Typography";
import { pushTo } from "helpers/history";
import { useLocation } from "react-router-dom";
import { MenuItemCardProps } from "../types";
import { ReactComponent as IconMenuStar } from "assets/images/icons/menu-star.svg";
import { ReactComponent as IconMenuKeyword } from "assets/images/icons/menu-keyword.svg";
import { ReactComponent as IconMenuUserMobile } from "assets/images/icons/menu-user-mobile.svg";
import { ReactComponent as IconMenuCMSUser } from "assets/images/icons/menu-user.svg";
import { ReactComponent as IconMenuLegalPage } from "assets/images/icons/menu-legal-page.svg";
import { ReactComponent as IconMenuReferralCode } from "assets/images/icons/referral-code.svg";
import { ReactComponent as IconMenuNotification } from "assets/images/icons/notification.svg";
import { ReactComponent as IconMenuFee } from "assets/images/icons/fee.svg";
import { ReactComponent as IconSetting } from "assets/images/icons/setting.svg";
import { ReactComponent as IconMenuEvent } from "assets/images/icons/event.svg";
import { ReactComponent as IconMenuReport } from "assets/images/icons/report.svg";
import { ReactComponent as IconMenuTreasure } from "assets/images/icons/planet.svg";
import { ReactComponent as IconMenuVideo } from "assets/images/icons/menu-video.svg";
import { ReactComponent as IconMenuVersion } from "assets/images/icons/menu-version.svg";

import { PATH } from "helpers/constant";

const MenuItemCard = (props: MenuItemCardProps): JSX.Element => {
  const location = useLocation();
  const { menu, openMenu } = props;
  const activeMenu = location.pathname === menu.path;

  const handleMenuPage = () => {
    pushTo(menu.path);
  };

  const renderIconMenu = () => {
    switch (menu.path) {
      case PATH.user:
        return <IconMenuStar />;
      case PATH.userCharacter:
        return <IconMenuFee />;
      // case PATH.inventory:
      //   return <IconMenuKeyword />;
      case PATH.rewardHistory:
        return <IconMenuUserMobile />;
      case PATH.singleGameHistory:
        return <IconMenuCMSUser />;
      case PATH.battleGameHistory:
        return <IconMenuLegalPage />;
      case PATH.transaction:
        return <IconMenuReferralCode />;
      case PATH.character:
        return <IconMenuNotification />;
      case PATH.download:
        return <IconMenuFee />;
      case PATH.version:
        return <IconSetting />;
      // case PATH.stars:
      //   return <IconMenuTreasure />;
      // case PATH.keywords:
      //   return <IconMenuKeyword />;
      // case PATH.mobileUsers:
      //   return <IconMenuUserMobile />;
      // case PATH.cmsUsers:
      //   return <IconMenuCMSUser />;
      // case PATH.legalPage:
      //   return <IconMenuLegalPage />;
      // case PATH.referralCode:
      //   return <IconMenuReferralCode />;
      // case PATH.notifications:
      //   return <IconMenuNotification />;
      // case PATH.fee:
      //   return <IconMenuFee />;
      // case PATH.settings:
      //   return <IconSetting />;
      // case PATH.events:
      //   return <IconMenuEvent />;
      // case PATH.reports:
      //   return <IconMenuReport />;
      // case PATH.treasure:
      //   return <IconMenuTreasure />;
      // case PATH.advertisement:
      //   return <IconMenuVideo />;
      // case PATH.manageVersions:
      //   return <IconMenuVersion />;
    }
  };

  return (
    <div
      onClick={handleMenuPage}
      className={`h-50-custom pl-8 flex items-center relative mb-3 cursor-pointer hover-menu-item ${
        activeMenu ? "bg-primary-custom content-menu-item svg-icon-menu" : ""
      }`}
    >
      {renderIconMenu()}
      {openMenu ? (
        <Typography
          variant="h6"
          textColor={activeMenu ? "text-primary-custom" : "text-gray-custom"}
          fontWeight="font-medium"
          textClass="ml-7 custom-white-space"
        >
          {menu.label}
        </Typography>
      ) : null}
    </div>
  );
};

export default MenuItemCard;
