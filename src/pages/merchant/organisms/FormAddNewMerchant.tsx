import ButtonDefault from "components/Button/ButtonDefault";
import DialogCard from "components/Dialog/DialogCard";
import IconInputPassword from "components/Input/IconInputPassword";
import InputDefault from "components/Input/InputDefault";
import { STATUS_INPUT } from "components/Input/types";
import { useBoolean } from "helpers/hooks";
import { isValidEmail, isValidMerchantName, isValidPassword, isValidPhone } from "helpers/util";
import { addNewClientMiddleware } from "pages/merchant/services/api";
import React, { FC, useState } from "react";
import { STATUS_RESPONSE_CODE } from "types";
import { FormInputMerchant, AddMerchantInput } from "../types";

const FormAddNewClient: FC<FormInputMerchant> = (props) => {
    const { onClose, openFormChange, onRefetch } = props;

    const isLoading = useBoolean();
    const changeTypePasswordInput = useBoolean();

    const [formInput, setFormInput] = useState<AddMerchantInput>({
        merchantName: "",
        phone: "",
        email: "",
        password: "",
        passwordConfirm: "",
    });
    const [statusEmailInput, setStatusEmailInput] = useState<STATUS_INPUT>(
        STATUS_INPUT.DEFAULT
    );

    const handleChangeIconPassword = () => {
        changeTypePasswordInput.setValue(!changeTypePasswordInput.value);
    };

    const isDisabledButton = () => {
        if (
            !isValidMerchantName(formInput.merchantName) ||
            !isValidPhone(formInput.phone) ||
            formInput.password !== formInput.passwordConfirm ||
            !isValidPassword(formInput.password)
        ) {
            return true;
        }
        return !isValidEmail(formInput.email);
    };

    const onSubmitButton = () => {
        isLoading.setValue(true);
        addNewClientMiddleware(formInput, (status: STATUS_RESPONSE_CODE) => {
            isLoading.setValue(false);
            if (status === STATUS_RESPONSE_CODE.SUCCESS) {
                onRefetch();
                onClose();
            }
        });
    };

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
        (key: "email" | "password" | "passwordConfirm" | "merchantName" | "phone") =>
            (event: React.ChangeEvent<HTMLInputElement>) => {
                if (key === "email") {
                    let newStatus = STATUS_INPUT.DEFAULT;
                    if (event.target.value) {
                        newStatus = isValidEmail(event.target.value)
                            ? STATUS_INPUT.VALID
                            : STATUS_INPUT.ERROR;
                    }
                    setStatusEmailInput(newStatus);
                }
                setFormInput({
                    ...formInput,
                    [key]: event.target.value,
                })
            };

    const inputStyle: React.CSSProperties = {
        border: "1px solid #e5e5e5",
        backgroundColor: "rgba(0,0,0,0.01)",
        borderRadius: "4px",
        padding: "0px 10px",
        marginTop: 5,
    };

    return (
        <DialogCard
            openPopup={openFormChange}
            disablePopup
            handleCLoseDialog={onClose}
            title="Add New Merchant"
            rootStyle={{
                width: "400px"
            }}
        >
            <InputDefault
                inputStyle={inputStyle}
                label="Email"
                required
                rootClass="mb-6"
                value={formInput.email}
                onChange={handleChangeInput("email")}
                status={statusEmailInput}
                onKeyPress={onKeyPress}
            />
            <InputDefault
                inputStyle={inputStyle}
                label="Password"
                required
                rootClass="mb-6"
                value={formInput.password}
                onChange={handleChangeInput("password")}
                onKeyPress={onKeyPress}
                type={changeTypePasswordInput.value ? "text" : "password"}
                childrenIcon={
                    <IconInputPassword
                        isShowPassword={changeTypePasswordInput.value}
                        handleChangeIconPassword={handleChangeIconPassword}
                    />
                }
            />
            <InputDefault
                inputStyle={inputStyle}
                label="Confirm Password"
                required
                rootClass="mb-6"
                value={formInput.passwordConfirm}
                onChange={handleChangeInput("passwordConfirm")}
                onKeyPress={onKeyPress}
                type={changeTypePasswordInput.value ? "text" : "password"}
                childrenIcon={
                    <IconInputPassword
                        isShowPassword={changeTypePasswordInput.value}
                        handleChangeIconPassword={handleChangeIconPassword}
                    />
                }
            />
            <InputDefault
                inputStyle={inputStyle}
                label="Name"
                required
                rootClass="mb-6"
                value={formInput.merchantName}
                onChange={handleChangeInput("merchantName")}
                onKeyPress={onKeyPress}
            />
            <InputDefault
                inputStyle={inputStyle}
                label="Phone"
                required
                rootClass="mb-6"
                value={formInput.phone}
                onChange={handleChangeInput("phone")}
                onKeyPress={onKeyPress}
            />
            <ButtonDefault
                widthButton="w-140-custom"
                disabled={isDisabledButton()}
                onClick={onSubmitButton}
            >
                {/* {dataItem.id ? "Update" : "Add"} */}
                Add
            </ButtonDefault>
        </DialogCard>
    )
};

export default FormAddNewClient;