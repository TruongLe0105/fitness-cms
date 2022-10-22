import IconClose from "assets/images/icons/close.svg";
import BackdropCustomize from "components/BackdropCustomize";
import ButtonDefault from "components/Button/ButtonDefault";
import MultipleInput from "components/Input/Multiple";
import Typography from "components/Typography";
import { useBoolean } from "helpers/hooks";
import React, { useEffect } from "react";
import Popup from "reactjs-popup";
import { STATUS_RESPONSE_CODE } from "types";
import { updateBIOStarMiddleware } from "../services/api";
import { FormUpdateBIOProps, StarInfo } from "../types";

const FormUpdateBIO = (props: FormUpdateBIOProps): JSX.Element => {
  const {
    modelData,
    onClose,
    openForm,
    idStar,
    updateStarDetailWhenUpdateBIO,
  } = props;

  const [value, setValue] = React.useState("");
  const isLoading = useBoolean();

  useEffect(() => {
    if (!modelData) {
      return;
    }

    setValue(modelData.replace(/<[^>]*>?/gm, ""));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modelData]);

  const handleChangeInput = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(event.target.value);
  };

  const onSubmit = () => {
    isLoading.setValue(true);
    updateBIOStarMiddleware(
      idStar,
      {
        bio: value,
      },
      (status: STATUS_RESPONSE_CODE, dataRes?: StarInfo) => {
        isLoading.setValue(false);
        if (status === STATUS_RESPONSE_CODE.SUCCESS && dataRes) {
          updateStarDetailWhenUpdateBIO(dataRes);
          onClose();
        }
      }
    );
  };

  return (
    <Popup disabled className="dialog" open={openForm}>
      <div className="view-dialog-body">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center">
            <Typography
              variant="h3"
              fontWeight="font-bold"
              textColor="text-primary-custom"
            >
              Update BIO
            </Typography>
          </div>

          <img
            src={IconClose}
            alt="icon"
            className="cursor-pointer"
            onClick={onClose}
          />
        </div>
        <div className="flex flex-col px-4 pt-4 card-update-bio-popup">
          {/* <InputEditor
            value={inputEditor.value}
            setValue={handleChangeEditor}
            optionsInput={["inline"]}
          /> */}
          <MultipleInput
            label=""
            rootClass="mb-6"
            rows={10}
            value={value}
            onChange={handleChangeInput}
          />
        </div>
        <div className="flex items-center justify-between mt-8">
          <ButtonDefault
            widthButton="w-140-custom"
            onClick={onSubmit}
            disabled={!value || value === modelData}
          >
            Update
          </ButtonDefault>
        </div>

        {isLoading.value ? <BackdropCustomize /> : null}
      </div>
    </Popup>
  );
};

export default FormUpdateBIO;
