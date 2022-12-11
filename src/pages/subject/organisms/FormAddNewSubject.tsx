import ButtonDefault from "components/Button/ButtonDefault";
import DialogCard from "components/Dialog/DialogCard";
import InputDefault from "components/Input/InputDefault";
import { useBoolean, useString } from "helpers/hooks";
import { showNotification } from "helpers/util";
import React, { FC, useEffect, useState } from "react";
import { STATUS_RESPONSE_CODE } from "types";
import ImageEventCard from "../molecules/ImageEventCard";
import { addNewSubjectMiddleware, uploadImageMiddleware } from "../services/api";
import { FormAddSubject, InputSubject } from "../types";


const FormAddNewSubject: FC<FormAddSubject> = (props) => {
    const { onClose, openFormChange, handleUpdateList, dataItem } = props;

    const isLoading = useBoolean();
    // const name = useString();
    const keyInputFile = useString();
    const [fileInput, setFileInput] = useState<any>(null);
    const urlImage = useString();

    const [formInput, setFormInput] = useState<InputSubject>({
        name: "",
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

        addNewSubjectMiddleware(formInput, (status: STATUS_RESPONSE_CODE) => {
            isLoading.setValue(false);
            if (status === STATUS_RESPONSE_CODE.SUCCESS) {
                handleUpdateList();
                onClose();
            }
        })
        return;
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
                    })
                    // name.setValue(event.target.value);
                    return;
                }
            };

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

    return (
        <DialogCard
            openPopup={openFormChange}
            disablePopup
            handleCLoseDialog={onClose}
            title="Add New Subject"
            rootStyle={{
                width: "400px"
            }}
        >
            <InputDefault
                label="Subject"
                required
                rootClass="mb-6"
                value={formInput.name}
                onChange={handleChangeInput("name")}
                onKeyPress={onKeyPress}
                inputStyle={inputStyle}
            />
            <ImageEventCard
                fileInput={fileInput}
                fileSelectedImageURL={fileSelectedImageURL}
                keyInputFile={keyInputFile.value}
                handleRemoveFileInput={handleRemoveFileInput}
                originImage={dataItem.url}
            />
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

export default FormAddNewSubject;