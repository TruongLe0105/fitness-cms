/* eslint-disable react-hooks/exhaustive-deps */
import BackdropCustomize from "components/BackdropCustomize";
import ButtonDefault from "components/Button/ButtonDefault";
import CheckedDefault from "components/Checked/CheckedDefault";
import DialogCard from "components/Dialog/DialogCard";
import InputDatePicker from "components/Input/InputDatePicker";
import InputDefault from "components/Input/InputDefault";
import MultipleInput from "components/Input/Multiple";
import SelectDefault from "components/Select/SelectDefault";
import Typography from "components/Typography";
import { useBoolean, useString } from "helpers/hooks";
import { showNotification } from "helpers/util";
import { useEffect, useState } from "react";
import { STATUS_RESPONSE_CODE } from "types";
import { addNotificationMiddleware, updateNotificationMiddleware, } from "../services/api";
import { ListOptionToSendSelect, } from "../types";
const FormDialog = (props) => {
    const { onClose, openPopup, handleUpdateListNotification, dataItem } = props;
    const isLoading = useBoolean();
    const [selectToSend, setSelectToSend] = useState(ListOptionToSendSelect[0]);
    const [sentAt, setSentAt] = useState(new Date());
    const description = useString();
    const checkedTimeline = useBoolean();
    const name = useString();
    useEffect(() => {
        description.setValue(dataItem.description);
        name.setValue(dataItem.name);
        setSentAt(dataItem.startDate ? new Date(dataItem.startDate) : new Date());
        checkedTimeline.setValue(dataItem.startDate ? true : false);
        const newType = ListOptionToSendSelect.find((el) => el.value === dataItem.type);
        setSelectToSend(newType ? newType : ListOptionToSendSelect[0]);
    }, [dataItem]);
    const handleChangeInput = (event) => {
        description.setValue(event.target.value);
    };
    const handleChangeInputName = (event) => {
        name.setValue(event.target.value);
    };
    const handleChangeSelect = (value) => {
        setSelectToSend(value);
    };
    const isDisabledButton = () => {
        if (checkedTimeline.value && !sentAt) {
            return true;
        }
        if (!description.value || !name.value) {
            return true;
        }
        return false;
    };
    const onSubmit = () => {
        const request = {
            description: description.value,
            type: selectToSend.value,
            name: name.value,
        };
        if (checkedTimeline.value) {
            const timeSentAt = new Date(sentAt).getTime();
            const timeNow = new Date().getTime();
            if (timeSentAt < timeNow) {
                showNotification("error", "Schedule-Timeline must be greater than the current time!");
                return;
            }
            request.sentAt = sentAt.toISOString();
        }
        isLoading.setValue(true);
        if (dataItem.id) {
            updateNotificationMiddleware(dataItem.id, request, (status, dataRes) => {
                isLoading.setValue(false);
                if (status === STATUS_RESPONSE_CODE.SUCCESS && dataRes) {
                    handleUpdateListNotification(dataRes);
                    onClose();
                }
            });
            return;
        }
        addNotificationMiddleware(request, (status) => {
            isLoading.setValue(false);
            if (status === STATUS_RESPONSE_CODE.SUCCESS) {
                handleUpdateListNotification();
                onClose();
            }
        });
    };
    const handleChangeCheckedTimeline = () => {
        checkedTimeline.setValue(!checkedTimeline.value);
        setSentAt(dataItem.startDate ? new Date(dataItem.startDate) : new Date());
    };
    return (<DialogCard openPopup={openPopup} handleCLoseDialog={onClose} disablePopup title={`${dataItem.id ? "Update" : "Add"} notification`}>
      <InputDefault label="Name" required rootClass="mb-6" value={name.value} onChange={handleChangeInputName}/>
      <MultipleInput label="Description*" rootClass="mb-6" rows={5} value={description.value} onChange={handleChangeInput}/>
      <Typography fontWeight="font-semibold" textColor="text-gray-custom" textClass="text-xs mb-1">
        Option to send*
      </Typography>

      <SelectDefault options={ListOptionToSendSelect} selectedOption={selectToSend} handleChange={handleChangeSelect} filed="name" styleSingleValue={{
            display: "flex",
            alignItems: "center",
        }} rootClasses="mb-6"/>
      <div className="flex items-center mb-6">
        <CheckedDefault disabled={dataItem.id ? true : false} checked={checkedTimeline.value} onClick={handleChangeCheckedTimeline}/>
        <Typography fontWeight="font-semibold" textColor="text-gray-custom" textClass="text-xs ml-3">
          Schedule-Timeline
        </Typography>
      </div>
      {checkedTimeline.value ? (<InputDatePicker label="" rootClass="mb-14" inputDate={sentAt} setInputDate={setSentAt}/>) : null}

      <ButtonDefault widthButton="w-140-custom" disabled={isDisabledButton()} onClick={onSubmit}>
        {dataItem.id ? "Update" : "Add"}
      </ButtonDefault>
      {isLoading.value ? <BackdropCustomize /> : null}
    </DialogCard>);
};
export default FormDialog;
