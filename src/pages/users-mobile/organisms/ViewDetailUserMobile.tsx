import Typography from "components/Typography";
import Popup from "reactjs-popup";
import IconClose from "assets/images/icons/close.svg";
import {
  defaultEmptyUserMobileDetail,
  UserMobileDetail,
  ViewDetailUserMobileProps,
} from "../types";
import React, { useEffect, useState } from "react";
import { getUserProfileMiddleware } from "../services/api";
import IconDefaultAvatar from "assets/images/icons/default-avatar.svg";
import TitleStarCard from "pages/stars/molecules/TitleStarCard";
import BackdropCustomize from "components/BackdropCustomize";
import { useBoolean } from "helpers/hooks";
import { onRedirectTestnet } from "helpers/util";
import Profile from "./Profile";

const ViewDetailUserMobile = (
  props: ViewDetailUserMobileProps
): JSX.Element => {
  const { handleClosePopup, formOpenViewDetail, openPopup } = props;
  const [userProfile, setUserProfile] = useState<UserMobileDetail>(
    defaultEmptyUserMobileDetail
  );
  const isLoading = useBoolean();
  const userInfo = userProfile.userInfo || {};

  useEffect(() => {
    isLoading.setValue(true);
    getUserProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formOpenViewDetail.id]);

  const getUserProfile = async () => {
    const dataRes = await getUserProfileMiddleware(formOpenViewDetail.id);
    setUserProfile(dataRes);
    isLoading.setValue(false);
  };
  const onClose = () => {
    setUserProfile(defaultEmptyUserMobileDetail);
    handleClosePopup();
  };

  return (
    <React.Fragment>
      <Popup modal open={openPopup} closeOnDocumentClick={false}>
        <div
          className="view-dialog-body"
          style={{
            minWidth: 550,
          }}
        >
          <div className="flex items-center justify-end mb-3">
            <img
              src={IconClose}
              alt="icon"
              className="cursor-pointer"
              onClick={onClose}
            />
          </div>
          <div className="flex flex-col p-4 card-info-star">
            <div className="flex justify-center mb-8">
              <div
                style={{
                  backgroundImage: `url(${
                    userProfile.avatar ?? IconDefaultAvatar
                  })`,
                }}
                className="w-112-custom h-112-custom rounded-full bg-no-repeat bg-center bg-cover"
              />
            </div>
            <Profile {...userProfile} {...userInfo} />
            <div style={{ border: "1px solid #c2c4c7", margin: 10 }} />

            <TitleStarCard
              label="Stars Owned:"
              message={
                userProfile.startsOwned ? String(userProfile.startsOwned) : "0"
              }
              rootClassName="mb-3"
            />
            <TitleStarCard
              label="Keywords Owned:"
              message={
                userProfile.keywordsOwned
                  ? String(userProfile.keywordsOwned)
                  : "0"
              }
              rootClassName="mb-3"
            />
            {userProfile.address?.length ? (
              <div className={`flex flex-col item-center mb-3`}>
                <Typography
                  textColor="text-gray-custom"
                  fontWeight="font-normal"
                  textClass="mr-3"
                >
                  ID Address:
                </Typography>
                {userProfile.address.map((add) => (
                  <Typography
                    key={add}
                    onClick={onRedirectTestnet(add)}
                    textColor="text-primary-custom"
                    fontWeight="font-normal"
                    textClass={`work-break-custom cursor-pointer hover:underline`}
                  >
                    {add}
                  </Typography>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </Popup>
      {isLoading.value ? <BackdropCustomize /> : null}
    </React.Fragment>
  );
};

export default ViewDetailUserMobile;
