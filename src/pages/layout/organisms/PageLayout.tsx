import { useBoolean } from "helpers/hooks";
import { PageLayoutProps } from "../types";
import Header from "./Header";
import MenuLayout from "./MenuLayout";

const PageLayout = (props: PageLayoutProps): JSX.Element => {
  const { children, title, childrenAction } = props;

  const menuLocal = localStorage.getItem("menu_local");
  const openMenu = useBoolean(
    menuLocal && menuLocal === "false" ? false : true
  );

  const handleChangeMenu = () => {
    openMenu.setValue(!openMenu.value);
    localStorage.setItem("menu_local", String(!openMenu.value));
  };

  return (
    <div className="w-full h-screen py-8 pl-8">
      <div
        className="flex h-full"
        style={{
          paddingLeft: openMenu.value ? 332 : 122,
          transition: "0.4s padding ease-out",
        }}
      >
        <div
          style={{
            width: openMenu.value ? 300 : 90,
            transition: "0.4s width ease-out",
            position: "fixed",
            height: "calc(100vh - 64px)",
            left: 32,
          }}
        >
          <MenuLayout
            handleChangeMenu={handleChangeMenu}
            openMenu={openMenu.value}
          />
        </div>

        <div className="grid grid-row-page-layout-body w-full">
          <Header title={title} />
          <div>{childrenAction}</div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "calc(100% - 32px) 32px",
            }}
          >
            <div
              style={{
                overflow: "auto",
              }}
            >
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default PageLayout;
