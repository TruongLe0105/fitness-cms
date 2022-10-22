/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import BackdropCustomize from "components/BackdropCustomize";
import ButtonDefault from "components/Button/ButtonDefault";
import DialogCard from "components/Dialog/DialogCard";
import InputDatePicker from "components/Input/InputDatePicker";
import InputDefault from "components/Input/InputDefault";
import MultipleInput from "components/Input/Multiple";
import { useBoolean, useString } from "helpers/hooks";
import { showNotification } from "helpers/util";
import { useEffect, useState } from "react";
import { STATUS_RESPONSE_CODE } from "types";
import ImageEventCard from "../molecules/ImageEventCard";
import { addEventMiddleware, updateEventMiddleware } from "../services/api";
import { EventDetail, FormDialogProps } from "../types";

const FormDialog = (props: FormDialogProps): JSX.Element => {
  const { onClose, openPopup, handleUpdateListEvent, dataItem } = props;
  const isLoading = useBoolean();
  const name = useString();
  const description = useString();
  const targetURL = useString();
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const keyInputFile = useString();
  const [fileInput, setFileInput] = useState<any>(null);

  useEffect(() => {
    if (!dataItem.id) {
      setFileInput(null);
      return;
    }
    description.setValue(dataItem.description);
    name.setValue(dataItem.name);
    targetURL.setValue(dataItem.target);
    setStartDate(new Date(dataItem.startDate));
    setEndDate(new Date(dataItem.endDate));
  }, [dataItem]);

  const handleChangeInput =
    (key: "description" | "targetURL") =>
    (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      if (key === "description") {
        description.setValue(event.target.value);
        return;
      }
      targetURL.setValue(event.target.value);
    };
  const handleChangeInputName = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    name.setValue(event.target.value);
  };

  // const handleChangeSelect = (value: SelectToSendDetail) => {
  //   setSelectToSend(value);
  // };
  const isDisabledButton = () => {
    if (!name.value || !startDate || !endDate) {
      return true;
    }
    return false;
  };

  const onSubmit = () => {
    const timeStartDate = new Date(startDate).getTime();
    const timeEndDate = new Date(endDate).getTime();
    const timeNow = new Date().getTime();
    let isError = false;
    // if (targetURL.value && !validateURL(targetURL.value)) {
    //   showNotification("error", "Invalid link!");
    //   isError = true;
    // }

    if (!dataItem.id && timeStartDate < timeNow) {
      showNotification(
        "error",
        "Start Date must be greater than the current time!"
      );
      isError = true;
    }
    if (timeStartDate > timeEndDate) {
      showNotification(
        "error",
        "End date should be greater or equal to Start date!"
      );
      isError = true;
    }
    if (!dataItem.id && !fileInput) {
      showNotification("error", "Please add image");
      isError = true;
    }
    if (isError) {
      return;
    }

    const formData = new FormData();
    formData.append("name", name.value);
    formData.append("description", description.value);
    // formData.append("target", targetURL.value);
    formData.append("startDate", startDate.toISOString());
    formData.append("endDate", endDate.toISOString());
    if (fileInput) {
      formData.append("image", fileInput);
    }

    isLoading.setValue(true);
    if (dataItem.id) {
      updateEventMiddleware(
        dataItem.id,
        formData,
        (status: STATUS_RESPONSE_CODE, dataRes?: EventDetail) => {
          isLoading.setValue(false);
          if (status === STATUS_RESPONSE_CODE.SUCCESS && dataRes) {
            handleUpdateListEvent(dataRes);
            onClose();
          }
        }
      );
      return;
    }
    addEventMiddleware(formData, (status: STATUS_RESPONSE_CODE) => {
      isLoading.setValue(false);
      if (status === STATUS_RESPONSE_CODE.SUCCESS) {
        handleUpdateListEvent();
        onClose();
      }
    });
  };

  const fileSelectedImageURL = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFileInput(event.target.files[0]);
    }
    keyInputFile.setValue(Math.random().toString(36));
  };
  const handleRemoveFileInput = (event) => {
    event.stopPropagation();
    event.preventDefault();
    setFileInput(null);
  };

  return (
    <DialogCard
      openPopup={openPopup}
      handleCLoseDialog={onClose}
      disablePopup
      title={`${dataItem.id ? "Update" : "Add"} event`}
      rootStyle={{
        width: 800,
      }}
    >
      <div
        className="grid"
        style={{
          gridTemplateColumns: "359px calc(100% - 359px)",
        }}
      >
        <ImageEventCard
          fileInput={fileInput}
          fileSelectedImageURL={fileSelectedImageURL}
          keyInputFile={keyInputFile.value}
          handleRemoveFileInput={handleRemoveFileInput}
          originImage={dataItem.url}
        />
        <div className="flex flex-col">
          <InputDefault
            label="Name"
            required
            rootClass="mb-6"
            value={name.value}
            onChange={handleChangeInputName}
          />
          <MultipleInput
            label="Description"
            rootClass="mb-6"
            rows={5}
            value={description.value}
            onChange={handleChangeInput("description")}
          />
          {/* <MultipleInput
            label="Target URL"
            rootClass="mb-6"
            rows={3}
            value={targetURL.value}
            onChange={handleChangeInput("targetURL")}
          /> */}

          <InputDatePicker
            label="Start date*"
            rootClass="mb-6"
            inputDate={startDate}
            setInputDate={setStartDate}
          />
          <InputDatePicker
            label="End date*"
            rootClass="mb-14"
            inputDate={endDate}
            setInputDate={setEndDate}
          />
        </div>
      </div>

      <ButtonDefault
        widthButton="w-140-custom mt-8"
        disabled={isDisabledButton()}
        onClick={onSubmit}
      >
        {dataItem.id ? "Update" : "Add"}
      </ButtonDefault>
      {isLoading.value ? <BackdropCustomize /> : null}
    </DialogCard>
  );
};

export default FormDialog;
