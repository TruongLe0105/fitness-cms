import ButtonDefault from "components/Button/ButtonDefault";
import DialogCard from "components/Dialog/DialogCard";
import InputDefault from "components/Input/InputDefault";
import { useBoolean, useString } from "helpers/hooks";
import { showNotification } from "helpers/util";
import React, { FC, useEffect, useState } from "react";
import { STATUS_RESPONSE_CODE } from "types";
import { FormUpdate, InputUser } from "../types";

const FormUpdateUser: FC<FormUpdate> = (props) => {
    const { onClose, openFormChange, onRefetch, item } = props;

    const isLoading = useBoolean();
    // const name = useString();
    const keyInputFile = useString();
    const [fileInput, setFileInput] = useState<any>(null);
    const urlImage = useString();
    const isChange = useBoolean();

    const [formUpdate, setFormUpdate] = useState<InputUser>({
        clientName: item?.clientName,
        id: item?.id,
        status: item?.status
    });

    // useEffect(() => {
    //     setFormUpdate({
    //         ...formUpdate,
    //         logo: urlImage.value || item?.logo
    //     })
    // }, [item, urlImage.value, isChange.value]);

    const isDisabledButton = () => {
        if (
            !formUpdate.clientName ||
            !isChange.value
        ) {
            return true;
        }

        return false;
    };

    const onSubmitButton = () => {

        isLoading.setValue(true);

        // addNewSubjectMiddleware(formUpdate, (status: STATUS_RESPONSE_CODE) => {
        //     isLoading.setValue(false);
        //     if (status === STATUS_RESPONSE_CODE.SUCCESS) {
        //         onClose();
        //         onRefetch();
        //     }
        // })
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
        (key: "clientName") =>
            (event: React.ChangeEvent<HTMLInputElement>) => {
                if (key === "clientName") {
                    isChange.setValue(true);
                    setFormUpdate({
                        ...formUpdate,
                        [key]: event.target.value
                    })
                    return;
                }
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
                label="Client Name"
                required
                rootClass="mb-6"
                value={formUpdate.clientName}
                onChange={handleChangeInput("clientName")}
                onKeyPress={onKeyPress}
                inputStyle={inputStyle}
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

export default FormUpdateUser;