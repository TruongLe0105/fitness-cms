import MenuItemCard from "../molecules/MenuItemCard";
import { listMenuPage, listMenuSettings, MenuLayoutProps } from "../types";
import IconChangeMenu from "assets/images/icons/change-menu.svg";
// import IconLogoClose from "assets/images/menu-logo-close.png";
// import IconLogoOpen from "assets/images/menu-logo-open.png";
import IconLogoClose from "assets/images/favicon-16x16.webp";
import IconLogoOpen from "assets/images/favicon-16x16.webp";

const MenuLayout = (props: MenuLayoutProps): JSX.Element => {
  const { handleChangeMenu, openMenu } = props;
  return (
    <div
      className="w-full h-full menu-body flex flex-col"
      style={{
        display: "grid",
        gridTemplateRows: "66px 66px calc(100% - 132px)",
      }}
    >
      <div
        className={`h-66-custom flex ${
          openMenu ? "justify-end pr-4" : "justify-center"
        } items-start`}
      >
        <div className="p-1 mt-4 rounded-full cursor-pointer hover:bg-gray-custom">
          <img
            src={IconChangeMenu}
            alt="icon"
            className="cursor-pointer"
            onClick={handleChangeMenu}
          />
        </div>
      </div>
      {/* <div className="h-66-custom flex justify-center"> */}
      <div className="h-100-custom flex justify-center">
        <img
          src={openMenu ? IconLogoOpen : IconLogoClose}
          alt="icon"
          // className="h-50-custom"
          className="h-80-custom"
        />
      </div>
      <div className="overflow-auto mb-3 mt-14">
        {listMenuPage.map((menu, index) => (
          <MenuItemCard menu={menu} key={index} openMenu={openMenu} />
        ))}
        <div
          style={{
            borderTop: "1px solid #E6EAEF",
            marginTop: 10,
            paddingTop: 22,
          }}
        >
          {listMenuSettings.map((menu, index) => (
            <MenuItemCard menu={menu} key={index} openMenu={openMenu} />
          ))}
        </div>
      </div>
    </div>
  );
};
export default MenuLayout;
