/* eslint-disable @typescript-eslint/no-explicit-any */
import BackdropCustomize from "components/BackdropCustomize";
import ButtonDefault from "components/Button/ButtonDefault";
import DialogCard from "components/Dialog/DialogCard";
import InputDatePicker from "components/Input/InputDatePicker";
import InputDefault from "components/Input/InputDefault";
import InputEditor from "components/Input/InputEditor";
import { useBoolean } from "helpers/hooks";
import React, { useState } from "react";
import { createVersionMiddleware, updateVersionMiddleware, } from "../services/api";
import { isValidLink, parseTextEditorToHtml } from "../utils";
const FormDialog = (props) => {
    const { openPopup, onClose, item, onRefetch } = props;
    const isLoading = useBoolean();
    const [formInput, setFormInput] = useState({
        version: item?.version || "",
        publishedDate: item?.publishedDate || new Date(),
        description: item?.description || "",
        androidLink: item?.androidLink || "",
        iosLink: item?.iosLink || "",
    });
    const isShowPreview = useBoolean();
    const isChangeTextEditor = React.useRef(false);
    const handleChangeInput = (key) => (event) => {
        setFormInput({
            ...formInput,
            [key]: event?.target?.value,
        });
    };
    const handleChangeDate = (date) => setFormInput({
        ...formInput,
        publishedDate: date,
    });
    const handleChangeEditor = (description) => {
        // const htmlPuri = draftToHtmlPuri(JSON.parse(description));
        isChangeTextEditor.current = true;
        setFormInput((value) => ({
            ...value,
            description,
        }));
    };
    const isDisabledButton = () => {
        if (!formInput.version ||
            !formInput.publishedDate ||
            !formInput.androidLink ||
            !formInput.iosLink ||
            !isValidLink(formInput.androidLink) ||
            !isValidLink(formInput.iosLink)) {
            return true;
        }
        return false;
    };
    const onKeyPress = (event) => {
        if (event.key === "Enter") {
            event.preventDefault();
            if (isDisabledButton()) {
                return;
            }
            onSubmitButton();
        }
    };
    const onSubmitButton = () => {
        isLoading.setValue(true);
        const request = {
            ...formInput,
            description: isChangeTextEditor.current
                ? parseTextEditorToHtml(formInput.description)
                : formInput.description,
        };
        if (!item) {
            createVersionMiddleware(request, () => {
                isLoading.setValue(false);
                onClose();
                onRefetch?.();
            });
        }
        else {
            updateVersionMiddleware(item.id, request, () => {
                isLoading.setValue(false);
                onClose();
                onRefetch?.();
            });
        }
    };
    return (<DialogCard openPopup={openPopup} disablePopup handleCLoseDialog={onClose} title={`${item ? "Update" : "Add "} version`} rootStyle={{
            width: "70vw",
        }}>
      <InputDefault label="Version" required rootClass="mb-6" value={formInput.version} onChange={handleChangeInput("version")} onKeyPress={onKeyPress}/>
      <InputDatePicker required label="Public Date" rootClass="mb-6 z-10" inputDate={formInput.publishedDate
            ? new Date(formInput.publishedDate)
            : new Date()} setInputDate={handleChangeDate} dateFormat="dd MMM yyyy" hideTimeSelect/>
      <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
        }}>
        <InputDefault required label="Android Link" rootClass="mb-6" value={formInput.androidLink} onChange={handleChangeInput("androidLink")} onKeyPress={onKeyPress} rootStyle={{ width: "45%" }}/>
        <InputDefault required label="IOS Link" rootClass="mb-6" value={formInput.iosLink} onChange={handleChangeInput("iosLink")} onKeyPress={onKeyPress} rootStyle={{ width: "45%" }}/>
      </div>
      <div className="flex text-center justify-between">
        <p className="text-sm font-semibold text-gray-custom text-xs">
          Description
        </p>

        <div style={{ marginRight: 20 }} className="cursor-pointer flex text-center">
          <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike" checked={isShowPreview.value} onChange={() => isShowPreview.setValue(!isShowPreview.value)} style={{ marginRight: 5, width: 16, height: 16 }}></input>
          <label htmlFor="vehicle1" className="text-sm font-semibold text-gray-custom text-x">
            Show preview
          </label>
        </div>
      </div>
      {isShowPreview.value ? (<div style={{
                height: "calc(30vh + 78px)",
                overflow: "auto",
                padding: "10px 0",
                paddingRight: 10,
                boxSizing: "border-box",
            }} dangerouslySetInnerHTML={{
                __html: (isChangeTextEditor.current
                    ? parseTextEditorToHtml(formInput.description)
                    : formInput.description) || "",
            }}></div>) : (<InputEditor value={formInput.description} setValue={handleChangeEditor} editorStyle={{
                height: "30vh",
            }} containerStyle={{
                paddingLeft: 0,
            }}/>)}
      <ButtonDefault widthButton="w-140-custom" disabled={isDisabledButton()} onClick={onSubmitButton} style={{ marginTop: 10 }}>
        {item ? "Update" : "Add"}
      </ButtonDefault>
      {isLoading.value ? <BackdropCustomize /> : null}
    </DialogCard>);
};
export default FormDialog;
