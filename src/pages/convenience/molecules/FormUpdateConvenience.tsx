import ButtonDefault from "components/Button/ButtonDefault";
import DialogCard from "components/Dialog/DialogCard";
import InputDefault from "components/Input/InputDefault";
import SelectDefault from "components/Select/SelectDefault";
import { useBoolean, useString } from "helpers/hooks";
import { showNotification } from "helpers/util";
import React, { FC, useEffect, useState } from "react";
import { STATUS_RESPONSE_CODE } from "types";
import { ConvenienceTypeOptions } from "../constant";
import { addConvenienceMiddleware, updateConvenienceMiddleware, uploadImageMiddleware } from "../services/api";
import { UpdateConvenience, InputUpdateConvenience } from "../types";
import ImageEventCard from "./ImageEventCard";


const FormUpdateConvenience: FC<UpdateConvenience> = (props) => {
    const { onClose, openFormChange, onRefetch, item } = props;

    const isLoading = useBoolean();
    const isChange = useBoolean();
    const urlImage = useString();
    const keyInputFile = useString();
    const [fileInput, setFileInput] = useState<any>(null);

    const [formUpdate, setFormUpdate] = useState<InputUpdateConvenience>({
        name: item?.name,
        type: item?.type,
        logo: item?.logo,
        id: item?.id,
        status: item?.status
    });

    console.log("item:", item)
    console.log("formUpdate:", formUpdate)
    console.log("isChange:", isChange)

    useEffect(() => {
        setFormUpdate({
            ...formUpdate,
            logo: urlImage.value || item?.logo
        });
    }, [item, urlImage.value, isChange.value]);

    const isDisabledButton = () => {
        if (
            !formUpdate.name ||
            !formUpdate.type ||
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
        updateConvenienceMiddleware(formUpdate, (status: STATUS_RESPONSE_CODE) => {
            isLoading.setValue(false);
            if (status === STATUS_RESPONSE_CODE.SUCCESS) {
                onClose();
                onRefetch();
            }
        })
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
                    });
                    return;
                }
            };

    const onSelectChange = (value: any) => {
        isChange.setValue(true);
        setFormUpdate({
            ...formUpdate,
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

    const getTypeValue = () => {
        const currentValue = ConvenienceTypeOptions.find((el) => el.value === formUpdate.type);
        return currentValue;
    }

    return (
        <DialogCard
            openPopup={openFormChange}
            disablePopup
            handleCLoseDialog={onClose}
            title="Update Convenience"
            rootStyle={{ width: "300px" }}
        >
            <div
                className="grid"
            // style={{
            //     gridTemplateColumns: "359px calc(100% - 359px)",
            // }}
            >
                <ImageEventCard
                    fileInput={fileInput}
                    fileSelectedImageURL={fileSelectedImageURL}
                    keyInputFile={keyInputFile.value}
                    handleRemoveFileInput={handleRemoveFileInput}
                    originImage={item?.logo}
                />
                <div className="flex flex-col">
                    <InputDefault
                        label="Name"
                        required
                        rootClass="mb-6"
                        value={formUpdate.name}
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
                buttonClass="btn-dialog"
            >
                Update
            </ButtonDefault>
        </DialogCard>
    );

};

export default FormUpdateConvenience;