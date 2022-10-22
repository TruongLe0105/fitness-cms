import IconAddAvatar from "assets/images/icons/add-avatar.svg";
import TitleStarCard from "../molecules/TitleStarCard";
import { NameRegisterCardProps } from "../types";
import React from "react";
import { DEFAULT_IMAGE } from "../utils";
import { getNameModal } from "helpers/util";
const NameRegisterCard = (props: NameRegisterCardProps): JSX.Element => {
  const { starDetail, dataItem, keyInputFile, fileSelectedHandler } = props;

  const getImage = () => {
    if (starDetail.imgUrl) {
      return starDetail.imgUrl;
    }
    return DEFAULT_IMAGE;
  };

  return (
    <div className="flex flex-col w-250-custom">
      <div className="flex flex-col p-4 card-info-star">
        <div className="flex justify-center mb-3">
          <div className="relative w-full">
            <div
              style={{
                backgroundImage: `url(${getImage()})`,
                backgroundColor: !starDetail.imgUrl ? "#e0e0e0" : "",
              }}
              className="h-112-custom rounded-lg bg-no-repeat bg-center"
            />
            {/* {!dataItem.nftId ? ( */}
            <React.Fragment>
              <input
                id="container-files"
                onChange={fileSelectedHandler}
                accept={"image/*"}
                type="file"
                style={{ display: "none" }}
                key={keyInputFile || ""}
              />
              <label htmlFor="container-files">
                <div>
                  <img
                    src={IconAddAvatar}
                    alt="icon"
                    className="absolute bottom-2 right-2 cursor-pointer"
                  />
                </div>
              </label>
            </React.Fragment>
            {/* ) : null} */}
          </div>
        </div>
        {dataItem.model ? (
          <TitleStarCard
            label="Model:"
            message={getNameModal(dataItem.model)}
            rootClassName="mb-3"
            rootClassMessage="capitalize"
          />
        ) : null}

        {dataItem.info ? (
          <TitleStarCard
            label="Also Know:"
            message={dataItem.info.alsoKnow}
            rootClassName="mb-3"
          />
        ) : null}
        {dataItem.info ? (
          <TitleStarCard
            label="Distance:"
            message={dataItem.info.distance}
            isHtml
            rootClassName="mb-3"
          />
        ) : null}
      </div>
    </div>
  );
};
export default NameRegisterCard;
