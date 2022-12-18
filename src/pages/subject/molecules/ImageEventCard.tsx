import React from "react";
import { ReactComponent as IconImage } from "assets/images/icons/image.svg";
import IconAddAvatar from "assets/images/icons/add-avatar.svg";
import { ReactComponent as IconDestroy } from "assets/images/icons/destroy.svg";
import { ImageEventCardProps } from "../types";

const arePropsEqual = (
  prevProps: ImageEventCardProps,
  nextProps: ImageEventCardProps
) => {
  return prevProps.fileInput === nextProps.fileInput;
};

const ImageEventCard = React.memo((props: ImageEventCardProps): JSX.Element => {
  const {
    fileInput,
    fileSelectedImageURL,
    keyInputFile,
    handleRemoveFileInput,
    originImage,
  } = props;
  const renderImage = () => {
    if (fileInput) {
      return URL.createObjectURL(fileInput);
    }
    if (originImage) {
      return originImage;
    }
    return "";
  };

  console.log("originImage:", originImage)
  console.log("fileInput:", fileInput)

  return (
    <div className="flex flex-col">
      <div
        className={`rounded-lg ${!fileInput ? "bg-gray-04-custom" : ""
          } flex items-center justify-center relative bg-no-repeat bg-center bg-img`}
        style={{
          backgroundImage: `url(${renderImage()})`,
        }}
      >
        {!fileInput && !originImage ? <IconImage className="w-8 h-8" /> : null}
        <input
          id="container-files-image-URL"
          onChange={fileSelectedImageURL}
          accept={"image/*"}
          type="file"
          style={{ display: "none" }}
          key={keyInputFile || ""}
        />
        <label htmlFor="container-files-image-URL">
          <div>
            {fileInput ? (
              <div
                onClick={handleRemoveFileInput}
                className="w-8 h-8 rounded-full absolute bottom-2 right-12 cursor-pointer flex items-center justify-center"
                style={{
                  background: "rgba(29, 29, 29, 0.6)",
                }}
              >
                <IconDestroy className="w-4	h-4 destroy-image" />
              </div>
            ) : null}
            <img
              src={IconAddAvatar}
              alt="icon"
              className="absolute bottom-2 right-2 cursor-pointer"
            />
          </div>
        </label>
      </div>
      <div className="flex justify-center mt-3 pr-8">
        <p className="text-primary-custom font-semibold text-sm	">
          Logo
          {/* (327 x 300) */}
        </p>
      </div>
    </div>
  );
}, arePropsEqual);
export default ImageEventCard;
