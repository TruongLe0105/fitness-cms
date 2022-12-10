import ButtonDefault from "components/Button/ButtonDefault";
import DialogCard from "components/Dialog/DialogCard";
import InputDefault from "components/Input/InputDefault";
import SelectDefault from "components/Select/SelectDefault";
import { useBoolean, useString } from "helpers/hooks";
import { showNotification } from "helpers/util";
import React, { FC, useEffect, useState } from "react";
import { STATUS_RESPONSE_CODE } from "types";
import { ConvenienceTypeOptions } from "../constant";
import { addConvenienceMiddleware, uploadImageMiddleware } from "../services/api";
import { FormAddConvenience, InputConvenience } from "../types";
import ImageEventCard from "./ImageEventCard";


const FormAddNewConvenience: FC<FormAddConvenience> = (props) => {
    const { onClose, openFormChange, handleUpdateList, dataItem } = props;

    const isLoading = useBoolean();
    const urlImage = useString();
    const keyInputFile = useString();
    const [fileInput, setFileInput] = useState<any>(null);

    const [formInput, setFormInput] = useState<InputConvenience>({
        name: "",
        type: "",
        logo: "",
    });

    useEffect(() => {
        if (!dataItem.id) {
            setFileInput(null);
            return;
        }

        setFormInput({
            ...formInput,
            logo: urlImage.value
        })

    }, [dataItem, urlImage.value]);

    const isDisabledButton = () => {
        if (
            !formInput.name ||
            !formInput.type ||
            !formInput.logo
        ) {
            return true;
        }

        return false;
    };

    const onSubmitButton = () => {
        let isError = false;

        if (!dataItem.id && !fileInput) {
            showNotification("error", "Please add image");
            isError = true;
        }
        if (isError) {
            return;
        }


        isLoading.setValue(true);
        if (dataItem.id) {
            addConvenienceMiddleware(formInput, (status: STATUS_RESPONSE_CODE) => {
                isLoading.setValue(false);
                if (status === STATUS_RESPONSE_CODE.SUCCESS) {
                    handleUpdateList();
                    onClose();
                }
            })
            return;
        }
    }

    const onKeyPress = (event: React.KeyboardEvent<HTMLDivElement>): void => {
        if (event.key === "Enter") {
            event.preventDefault();
            if (isDisabledButton()) {
                return;
            }
            onSubmitButton();
        }
    };

    const handleChangeInput =
        (key: "name") =>
            (event: React.ChangeEvent<HTMLInputElement>) => {
                if (key === "name") {
                    setFormInput({
                        ...formInput,
                        [key]: event.target.value
                    });
                    return;
                }
            };

    const onSelectChange = (value: any) => {
        setFormInput({
            ...formInput,
            type: value.value
        })
    }

    const fileSelectedImageURL = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files: any = event.target.files;
        if (files) {
            setFileInput(files[0]);
            const formData = new FormData();
            formData.append("images", files[0]);
            uploadImageMiddleware(formData).then((response: any) => urlImage.setValue(response.data.data[0]));
        }
        keyInputFile.setValue(Math.random().toString(36));
    };

    const handleRemoveFileInput = (event) => {
        event.stopPropagation();
        event.preventDefault();
        setFileInput(null);
    };

    const inputStyle: React.CSSProperties = {
        border: "1px solid #e5e5e5",
        backgroundColor: "rgba(0,0,0,0.01)",
        borderRadius: "4px",
        padding: "0px 10px",
        margin: "5 0",
    };

    const getTypeValue = () => {
        ConvenienceTypeOptions.find((el) => el.value === formInput.type);
    }

    return (
        <DialogCard
            openPopup={openFormChange}
            disablePopup
            handleCLoseDialog={onClose}
            title="Add New Convenience"
        // rootStyle={{ width: "50%" }}
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
                        value={formInput.name}
                        onChange={handleChangeInput("name")}
                        onKeyPress={onKeyPress}
                        inputStyle={inputStyle}
                    />
                    <SelectDefault
                        label="Type"
                        required
                        options={ConvenienceTypeOptions}
                        selectedOption={getTypeValue()}
                        handleChange={onSelectChange}
                        styleControl={inputStyle}
                        styleSingleValue={{
                            display: "flex",
                            alignItems: "center",
                            fontSize: 14,
                            maxWidth: "inherit",
                        }}
                        controlWidth={1}
                    />
                </div>
            </div>
            <ButtonDefault
                widthButton="w-140-custom"
                disabled={isDisabledButton()}
                onClick={onSubmitButton}
            >
                Add
            </ButtonDefault>
        </DialogCard>
    );

};

export default FormAddNewConvenience;