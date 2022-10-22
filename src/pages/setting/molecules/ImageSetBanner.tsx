import React from "react";
import { ReactComponent as IconImage } from "assets/images/icons/image.svg";
import IconAddAvatar from "assets/images/icons/add-avatar.svg";
import { ReactComponent as IconDestroy } from "assets/images/icons/destroy.svg";
import { ImageSetBannerProps } from "../types";

const arePropsEqual = (
  prevProps: ImageSetBannerProps,
  nextProps: ImageSetBannerProps
) => {
  return (
    prevProps.fileInput === nextProps.fileInput &&
    prevProps.originImage === nextProps.originImage
  );
};

const ImageSetBanner = React.memo((props: ImageSetBannerProps): JSX.Element => {
  const {
    fileInput,
    onSelectedFiles,
    keyInputFile,
    handleRemoveFileInput,
    originImage,
    inputId,
    width,
    height,
    accept = "image/*",
    onDeletedFile,
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

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.length) {
      onSelectedFiles(event.target.files);
    }
  };

  const handleDeleteFile = (e) => {
    if (fileInput) {
      return handleRemoveFileInput(e);
    }
    e.stopPropagation();
    e.preventDefault();
    onDeletedFile?.(e);
  };

  return (
    <div className="flex flex-col">
      <div
        className={`rounded-lg ${
          !fileInput ? "bg-gray-04-custom" : ""
        } flex items-center justify-center relative bg-no-repeat bg-center bg-contain`}
        style={{
          backgroundImage: `url(${renderImage()})`,
          width,
          height,
        }}
      >
        {!fileInput && !originImage ? <IconImage className="w-8 h-8" /> : null}
        <input
          id={inputId}
          onChange={handleOnChange}
          accept={accept}
          type="file"
          style={{ display: "none" }}
          key={keyInputFile || ""}
        />
        <label htmlFor={inputId}>
          <div>
            {fileInput || (onDeletedFile && originImage) ? (
              <div
                onClick={handleDeleteFile}
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
    </div>
  );
}, arePropsEqual);
export default ImageSetBanner;
