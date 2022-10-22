/* eslint-disable @typescript-eslint/no-explicit-any */
import TitleStarCard from "../molecules/TitleStarCard";
import { ImagePreviewCardProps } from "../types";
import IconAddAvatar from "assets/images/icons/add-avatar.svg";
import BioCard from "../molecules/BioCard";
import React from "react";
import { getDefaultImageStar } from "helpers/util";

const ImagePreviewCard = (props: ImagePreviewCardProps): JSX.Element => {
  const {
    starDetail,
    fileSelectedHandlerImagePreview,
    keyInputFileImagePreview,
    dataItem,
    updateStarDetailWhenUpdateBIO,
  } = props;

  const getImage = () => {
    if (starDetail.imgUrlPreview) {
      return starDetail.imgUrlPreview;
    }
    return getDefaultImageStar(starDetail.model);
  };

  return (
    <div>
      <div className="grid grid-image-preview">
        <div className="relative">
          <img
            src={getImage()}
            className="w-112-custom h-112-custom rounded-full object-cover	"
          />
          {/* {!dataItem.nftId ? ( */}
          <React.Fragment>
            <input
              id="container-files-image-preview"
              onChange={fileSelectedHandlerImagePreview}
              accept={"image/*"}
              type="file"
              style={{ display: "none" }}
              key={keyInputFileImagePreview || ""}
            />
            <label htmlFor="container-files-image-preview">
              <div>
                <img
                  src={IconAddAvatar}
                  alt="icon"
                  className="absolute bottom-12 right-1 cursor-pointer"
                />
              </div>
            </label>
          </React.Fragment>
          {/* ) : null} */}
          <div className="flex flex-col items-center justify-center mt-3">
            <p className="text-primary-custom font-semibold text-xs mb-1">
              Thumbnail image
            </p>
            <p className="text-primary-custom font-semibold text-xs">
              ({`900 x 900`})
            </p>
          </div>
        </div>

        <div className="flex flex-col justify-center ml-8">
          <TitleStarCard
            label="Mag:"
            message={dataItem.info?.mag ?? "No data"}
            rootClassName="mb-3"
          />
          <TitleStarCard
            label="Visibility:"
            message={dataItem.info?.visibility ?? "No data"}
            isHtml
            rootClassName="mb-3"
          />
          <TitleStarCard
            label="Ra/Dec:"
            message={dataItem.info?.raDec ?? "No data"}
            isHtml
            rootClassName="mb-3"
          />
          <TitleStarCard
            label="Az/Alt:"
            message={dataItem.info?.azAlt ?? "No data"}
            isHtml
          />
        </div>
      </div>
      <BioCard
        modelData={
          starDetail.info && starDetail.info.modelData
            ? starDetail.info.modelData
            : ""
        }
        isUpdateBIO={
          starDetail.info && !dataItem.owner && !dataItem.market?.seller
            ? true
            : false
        }
        idStar={dataItem.id}
        updateStarDetailWhenUpdateBIO={updateStarDetailWhenUpdateBIO}
      />
    </div>
  );
};

export default ImagePreviewCard;
