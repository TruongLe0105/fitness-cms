import Typography from "components/Typography";
import { pushTo } from "helpers/history";
import { useLocation } from "react-router-dom";
import { MenuItemCardProps } from "../types";
import { ReactComponent as IconMenuUser } from "assets/images/icons/menu-user.svg";
import { ReactComponent as IconMenuGym } from "assets/images/icons/icon-gym.svg";
import { ReactComponent as IconMenuMerchant } from "assets/images/icons/merchant-icon.svg";
import { ReactComponent as IconMenuPackage } from "assets/images/icons/package-icon.svg";
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
        return <IconMenuUser />;
      case PATH.gym:
        return <IconMenuGym />;
      case PATH.merchant:
        return <IconMenuMerchant />;
      case PATH.package:
        return <IconMenuPackage />;
      case PATH.subject:
        return <IconMenuPackage />;
      case PATH.convenience:
        return <IconMenuPackage />;
    }
  };

  return (
    <div
      onClick={handleMenuPage}
      className={`h-50-custom pl-8 flex items-center relative mb-3 cursor-pointer hover-menu-item ${activeMenu ? "bg-primary-custom content-menu-item svg-icon-menu" : ""
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
