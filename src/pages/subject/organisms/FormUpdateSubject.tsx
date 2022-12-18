import ButtonDefault from "components/Button/ButtonDefault";
import DialogCard from "components/Dialog/DialogCard";
import InputDefault from "components/Input/InputDefault";
import { useBoolean, useString } from "helpers/hooks";
import { showNotification } from "helpers/util";
import React, { FC, useEffect, useState } from "react";
import { STATUS_RESPONSE_CODE } from "types";
import ImageEventCard from "../molecules/ImageEventCard";
import { addNewSubjectMiddleware, uploadImageMiddleware } from "../services/api";
import { FormUpdate, InputSubject, InputUpdate } from "../types";


const FormUpdateSubject: FC<FormUpdate> = (props) => {
    const { onClose, openFormChange, onRefetch, item } = props;

    const isLoading = useBoolean();
    // const name = useString();
    const keyInputFile = useString();
    const [fileInput, setFileInput] = useState<any>(null);
    const urlImage = useString();
    const isChange = useBoolean();

    const [formUpdate, setFormUpdate] = useState<InputUpdate>({
        name: item?.name,
        logo: item?.logo,
        id: item?.id,
        status: item?.status
    });

    useEffect(() => {
        setFormUpdate({
            ...formUpdate,
            logo: urlImage.value || item?.logo
        })
    }, [item, urlImage.value, isChange.value]);

    const isDisabledButton = () => {
        if (
            !formUpdate.name ||
            !formUpdate.logo ||
            !isChange.value
        ) {
            return true;
        }

        return false;
    };

    const onSubmitButton = () => {
        let isError = false;

        if (!formUpdate.logo) {
            showNotification("error", "Please add image");
            isError = true;
        }
        if (isError) {
            return;
        }

        isLoading.setValue(true);

        addNewSubjectMiddleware(formUpdate, (status: STATUS_RESPONSE_CODE) => {
            isLoading.setValue(false);
            if (status === STATUS_RESPONSE_CODE.SUCCESS) {
                onClose();
                onRefetch();
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
                    isChange.setValue(true);
                    setFormUpdate({
                        ...formUpdate,
                        [key]: event.target.value
                    })
                    return;
                }
            };

    console.log("isChange:", isChange.value);
    console.log("logo:", formUpdate.logo);


    const fileSelectedImageURL = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files: any = event.target.files;
        if (files) {
            setFileInput(files[0]);
            const formData = new FormData();
            formData.append("images", files[0]);
            uploadImageMiddleware(formData).then((response: any) => urlImage.setValue(response.data.data[0]));
            isChange.setValue(true);
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
            title="Update Subject"
            rootStyle={{
                width: "400px"
            }}
        >
            <InputDefault
                label="Name"
                required
                rootClass="mb-6"
                value={formUpdate.name}
                onChange={handleChangeInput("name")}
                onKeyPress={onKeyPress}
                inputStyle={inputStyle}
            />
            <ImageEventCard
                fileInput={fileInput}
                fileSelectedImageURL={fileSelectedImageURL}
                keyInputFile={keyInputFile.value}
                handleRemoveFileInput={handleRemoveFileInput}
                originImage={item?.logo}
            />
            <ButtonDefault
                widthButton="w-140-custom"
                disabled={isDisabledButton()}
                onClick={onSubmitButton}
            >
                Update
            </ButtonDefault>
        </DialogCard>
    );

};

export default FormUpdateSubject;