/* eslint-disable @typescript-eslint/no-explicit-any */
import BackdropCustomize from "components/BackdropCustomize";
import ButtonDefault from "components/Button/ButtonDefault";
import DialogCard from "components/Dialog/DialogCard";
import InputDefault from "components/Input/InputDefault";
import MultipleInput from "components/Input/Multiple";
import SelectDefault from "components/Select/SelectDefault";
import { useBoolean } from "helpers/hooks";
import React, { useEffect, useState } from "react";
import { STATUS_RESPONSE_CODE } from "types";
import { addKeywordMiddleware, updateKeywordMiddleware } from "../services/api";
const FormChange = (props) => {
    const { categories, dataItem, handleUpdateList, openFormChange, onClose } = props;
    const [formInput, setFormInput] = useState({
        name: dataItem.name,
        categoryId: dataItem?.category?.id || 0,
        meaning: "",
    });
    useEffect(() => {
        setFormInput({
            name: dataItem.name,
            categoryId: dataItem?.category?.id || 0,
            meaning: dataItem?.meaning || "",
        });
    }, [dataItem.name, dataItem.category, dataItem.meaning]);
    const isLoading = useBoolean();
    const handleChangeInput = (key) => (event) => {
        setFormInput({
            ...formInput,
            [key]: event.target.value,
        });
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
    const isDisabledButton = () => {
        if (!formInput.name) {
            return true;
        }
        return false;
    };
    const onSubmitButton = () => {
        if (!dataItem.id) {
            onSubmitAdd();
            return;
        }
        onSubmitUpdate();
    };
    const onSubmitAdd = () => {
        isLoading.setValue(true);
        addKeywordMiddleware(formInput, (status) => {
            isLoading.setValue(false);
            if (status === STATUS_RESPONSE_CODE.SUCCESS) {
                handleUpdateList();
                onClose();
            }
        });
    };
    const onSubmitUpdate = () => {
        isLoading.setValue(true);
        updateKeywordMiddleware(dataItem.id, formInput, (status, dataRes) => {
            isLoading.setValue(false);
            if (status === STATUS_RESPONSE_CODE.SUCCESS && dataRes) {
                handleUpdateList(dataRes);
                onClose();
            }
        });
    };
    // const handleCLoseDialog = () => {
    //   onClose();
    //   setFormInput({
    //     name: dataItem.name,
    //   });
    // };
    const onSelectChange = (data) => {
        setFormInput({
            ...formInput,
            categoryId: data?.value || 0,
        });
    };
    const getOptions = () => categories.map((el) => ({
        label: el.name,
        value: el.id,
    }));
    const getValueCategory = () => getOptions().find((el) => el.value === formInput.categoryId);
    return (<DialogCard openPopup={openFormChange} disablePopup handleCLoseDialog={onClose} title={`${dataItem.id ? "Update" : "Add "} keyword`}>
      <InputDefault label="Name" required rootClass="mb-6" value={formInput.name} onChange={handleChangeInput("name")} onKeyPress={onKeyPress}/>
      <SelectDefault 
    //isMulti
    label="Category" options={getOptions()} selectedOption={getValueCategory()} handleChange={onSelectChange} styleControl={{
            marginBottom: 30,
        }} styleSingleValue={{
            display: "flex",
            alignItems: "center",
            fontSize: 14,
            maxWidth: "inherit",
        }} controlWidth={1}/>
      <MultipleInput label="Meaning" rootClass="mb-6" rows={5} value={formInput.meaning} onChange={handleChangeInput("meaning")}/>
      <ButtonDefault widthButton="w-140-custom" disabled={isDisabledButton()} onClick={onSubmitButton}>
        {dataItem.id ? "Update" : "Add"}
      </ButtonDefault>
      {isLoading.value ? <BackdropCustomize /> : null}
    </DialogCard>);
};
export default FormChange;
