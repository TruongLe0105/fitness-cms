import React from "react";
import Typography from "components/Typography";
import { getFirstLetterInName } from "helpers/util";
import IconLogout from "assets/images/icons/log-out.svg";
import Popup from "reactjs-popup";
import { pushTo } from "helpers/history";
import { PATH } from "helpers/constant";
import { useEffect } from "react";
import { getAuthMeMiddleware } from "pages/auth/services/api";
import { useAppSelector } from "slices/store";

const AvatarUserHeader = (): JSX.Element => {
  const auth = useAppSelector((state) => state.auth.user);
  // useEffect(() => {
  //   if (auth.id) {
  //     return;
  //   }
  // getAuthMeMiddleware();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [auth.id]);

  const handleLogout = () => {
    localStorage.clear();
    pushTo(PATH.login);
  };

  return (
    <Popup
      trigger={
        <div className="flex items-center cursor-pointer">
          <Typography fontWeight="font-bold" textColor="text-black-02-custom">
            {auth.firstName} {auth.lastName}
          </Typography>
          <div className="h-10 w-10 bg-blue-custom rounded-full flex items-center justify-center ml-2">
            <Typography fontWeight="font-bold" textColor="text-white">
              {getFirstLetterInName(auth.lastName)}
            </Typography>
          </div>
        </div>
      }
      arrow={false}
    >
      <div className="logout-card mt-3">
        <div
          className="h-8 pl-3.5 pr-3.5 flex items-center justify-between bg-primary-custom cursor-pointer relative content-menu-logout"
          onClick={handleLogout}
        >
          <Typography
            textColor="text-primary-custom"
            fontWeight="font-medium"
            textClass="text-xs"
          >
            Log out
          </Typography>
          <img src={IconLogout} alt="icon" />
        </div>
      </div>
    </Popup>
  );
};
export default AvatarUserHeader;
