import ButtonDefault from "components/Button/ButtonDefault";
import DialogWarning from "components/DialogWarning";
import Typography from "components/Typography";
import { useBoolean, useString } from "helpers/hooks";
import { useState } from "react";
import { STATUS_RESPONSE_CODE } from "types";
import useBannerHooks from "../hooks/useBannerHooks";
import ImageSetBanner from "../molecules/ImageSetBanner";
import { deleteBannerMiddleware, updateBannerMiddleware, } from "../services/api";
export const SetBanner = ({ bannerName, message, setLoading, visibleBannerNote = false, buttonPosition = "vertical", bannerNoteStyle, ...otherProps }) => {
    /* eslint-disable  @typescript-eslint/no-explicit-any */
    const [fileInput, setFileInput] = useState(null);
    const keyInputFile = useString();
    const { image, refetch } = useBannerHooks(bannerName);
    const modal = useBoolean();
    const onSelectedFiles = (files) => {
        if (files) {
            setFileInput(files[0]);
        }
        keyInputFile.setValue(Math.random().toString(36));
    };
    const handleRemoveFileInput = (event) => {
        event.stopPropagation();
        event.preventDefault();
        setFileInput(null);
    };
    const handleSubmit = async () => {
        // isLoading.setValue(true);
        setLoading(true);
        const formData = new FormData();
        if (fileInput) {
            formData.append("image", fileInput);
        }
        updateBannerMiddleware(message, bannerName, formData, (status) => {
            if (status === STATUS_RESPONSE_CODE.SUCCESS) {
                setFileInput(null);
                refetch();
            }
            setLoading(false);
            // isLoading.setValue(false);
        });
    };
    const onDeletedFile = () => {
        modal.setValue(false);
        setLoading(true);
        deleteBannerMiddleware("Banner", bannerName, () => {
            setLoading(false);
            refetch();
        });
    };
    const getClasses = () => {
        if (buttonPosition === "vertical") {
            return "flex items-center pt-3";
        }
        return "flex flex-col pt-3";
    };
    return (<div className={getClasses()}>
      <div className="mr-4">
        <ImageSetBanner fileInput={fileInput} onSelectedFiles={onSelectedFiles} keyInputFile={keyInputFile.value} handleRemoveFileInput={handleRemoveFileInput} originImage={image} onDeletedFile={() => modal.setValue(true)} {...otherProps}/>
      </div>
      <div className="flex flex-col justify-center">
        {visibleBannerNote && (<div className="flex justify-center" style={bannerNoteStyle}>
            <p className="text-primary-custom font-semibold text-sm	">
              Banner ({otherProps.width} x {otherProps.height})
            </p>
          </div>)}
        <ButtonDefault widthButton="w-130-custom" buttonClass="mt-3" disabled={!fileInput} onClick={handleSubmit}>
          <Typography fontWeight="font-semibold" textColor="text-white" textClass="text-xs">
            Save banner
          </Typography>
        </ButtonDefault>
      </div>

      <DialogWarning onSubmit={onDeletedFile} openPopup={modal.value} title="Removing Banner" handleCLoseDialog={() => modal.setValue(false)} children={`Are you sure you want to delete ${message}? Please confirm again!`}/>
    </div>);
};
