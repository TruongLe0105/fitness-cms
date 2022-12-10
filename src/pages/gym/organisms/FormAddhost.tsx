import ButtonDefault from "components/Button/ButtonDefault";
import DialogCard from "components/Dialog/DialogCard";
import InputDefault from "components/Input/InputDefault";
import { STATUS_INPUT } from "components/Input/types";
import SelectDefault from "components/Select/SelectDefault";
import { useBoolean, useString } from "helpers/hooks";
import React, { FC, useState } from "react";
import { STATUS_RESPONSE_CODE } from "types";
import { optionSegment } from "../constant";
import MultiSelectInput from "../molecules/MultiSelect";
import TimeInput from "../molecules/TimeWrapper";
import { addNewHostMiddleware } from "../services/api";
import { FormAddHostProps, InputHost } from "../types";

const FormAddHost: FC<FormAddHostProps> = (props) => {
    const { onClose, openFormChange, handleUpdateList } = props;

    const isLoading = useBoolean();
    const segment = useString();

    const [formInput, setFormInput] = useState<InputHost>({
        name: "",
        phone: "",
        description: "",
        segment: "",
        address: "",
        long: "",
        lat: "",
        openingTime: {
            from: 0,
            to: 0
        },
        // images: [],
        merchantId: [],
        subject: [],
        basicConvenience: [],
        favoriteConvenience: [],
        highClassConvenience: [],
        safeConvenience: [],
        rule: [{
            title: "title",
            content: "content"
        }],
        medicalAndSafe: [{
            title: "title",
            content: "content"
        }]
    });
    const [statusEmailInput, setStatusEmailInput] = useState<STATUS_INPUT>(
        STATUS_INPUT.DEFAULT
    );

    const isDisabledButton = () => {
        if (
            !formInput.name ||
            !formInput.phone ||
            !formInput.description ||
            !formInput.segment ||
            !formInput.address ||
            // openingTime ||
            !formInput.long ||
            !formInput.lat ||
            !formInput.merchantId.length ||
            !formInput.subject.length ||
            !formInput.basicConvenience.length ||
            !formInput.highClassConvenience.length ||
            !formInput.safeConvenience.length ||
            !formInput.rule.length ||
            !formInput.medicalAndSafe.length
        ) {
            return true;
        }
        return false;
    };

    const onSubmitButton = () => {
        console.log("formInsubmit", JSON.stringify(formInput))
        isLoading.setValue(true);
        addNewHostMiddleware(formInput, (status: STATUS_RESPONSE_CODE) => {
            isLoading.setValue(false);
            if (status === STATUS_RESPONSE_CODE.SUCCESS) {
                handleUpdateList();
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
        (key: "name" | "phone" | "description" | "segment" | "address" | "long" | "lat") =>
            (event: React.ChangeEvent<HTMLInputElement>) => {
                // if (key === "name") {
                //     let newStatus = STATUS_INPUT.DEFAULT;
                //     if (event.target.value) {
                //         newStatus = isValidEmail(event.target.value)
                //             ? STATUS_INPUT.VALID
                //             : STATUS_INPUT.ERROR;
                //     }
                //     setStatusEmailInput(newStatus);
                // }
                setFormInput({
                    ...formInput,
                    [key]: event.target.value,
                })
            };

    const onSelectChange = (value: any) => {
        // segment.setValue(value.value);
        setFormInput({
            ...formInput,
            segment: value.value
        })
    };

    const getTypeValue = () => {
        optionSegment.find((el) => el.value === formInput.segment)
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
            title="Add New Client"
            size="md"
            rootStyle={{
                width: "90vw",
                maxHeight: "90vh",
                overflow: "auto",
            }}
        >
            <p
                style={{
                    color: "rgba(239, 68, 68)",
                    marginBottom: 10,
                    fontWeight: 600,
                }}
            >
                *Please ensure that the data entered matches the actual data.
            </p>
            <p
                style={{
                    marginBottom: 20,
                    width: "fit-content",
                    color: "#1a1f36",
                    fontSize: 20,
                    letterSpacing: 0.6,
                }}
            >
                Basic information
            </p>
            <div className="grid grid-cols-4 mb-6 gap-5">
                <SelectDefault
                    label="Segment"
                    required
                    options={optionSegment}
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
                <InputDefault
                    inputStyle={inputStyle}
                    label="Name"
                    required
                    rootClass="mb-6"
                    value={formInput.name}
                    onChange={handleChangeInput("name")}
                    status={statusEmailInput}
                    onKeyPress={onKeyPress}
                />
                <InputDefault
                    inputStyle={inputStyle}
                    label="Phone"
                    required
                    rootClass="mb-6"
                    value={formInput.phone}
                    onChange={handleChangeInput("phone")}
                    status={statusEmailInput}
                    onKeyPress={onKeyPress}
                />
                <InputDefault
                    inputStyle={inputStyle}
                    label="Description"
                    required
                    rootClass="mb-6"
                    value={formInput.description}
                    onChange={handleChangeInput("description")}
                    status={statusEmailInput}
                    onKeyPress={onKeyPress}
                />
                <InputDefault
                    inputStyle={inputStyle}
                    label="Address"
                    required
                    rootClass="mb-6"
                    value={formInput.address}
                    onChange={handleChangeInput("address")}
                    status={statusEmailInput}
                    onKeyPress={onKeyPress}
                />
                <InputDefault
                    inputStyle={inputStyle}
                    label="Long"
                    required
                    rootClass="mb-6"
                    value={formInput.long}
                    onChange={handleChangeInput("long")}
                    status={statusEmailInput}
                    onKeyPress={onKeyPress}
                />
                <InputDefault
                    inputStyle={inputStyle}
                    label="Lat"
                    required
                    rootClass="mb-6"
                    value={formInput.lat}
                    onChange={handleChangeInput("lat")}
                    status={statusEmailInput}
                    onKeyPress={onKeyPress}
                />
            </div>
            <p
                style={{
                    marginBottom: 20,
                    paddingTop: 20,
                    color: "#1a1f36",
                    fontSize: 20,
                    borderTop: "1px solid #e5e5e5",
                    letterSpacing: 0.6,
                }}
            >
                Detail information
            </p>
            <div className="grid grid-cols-2 mb-6 gap-5">
                <MultiSelectInput
                    label="MerchantId"
                    inputType="merchantId"
                    require={true}
                    rootClasses="mb-6"
                    setFormInput={setFormInput}
                    formInput={formInput}
                    options={optionSegment}
                    styleControl={inputStyle}
                    styleSingleValue={{
                        display: "flex",
                        alignItems: "center",
                        fontSize: 14,
                        maxWidth: "inherit",
                    }}
                    controlWidth={1}
                />
                <MultiSelectInput
                    label="Subject"
                    inputType="subject"
                    require={true}
                    rootClasses="mb-6"
                    setFormInput={setFormInput}
                    formInput={formInput}
                    options={optionSegment}
                    styleControl={inputStyle}
                    styleSingleValue={{
                        display: "flex",
                        alignItems: "center",
                        fontSize: 14,
                        maxWidth: "inherit",
                    }}
                    controlWidth={1}
                />
                <MultiSelectInput
                    label="Basic Convenience"
                    inputType="basicConvenience"
                    require={true}
                    rootClasses="mb-6"
                    setFormInput={setFormInput}
                    formInput={formInput}
                    options={optionSegment}
                    styleControl={inputStyle}
                    styleSingleValue={{
                        display: "flex",
                        alignItems: "center",
                        fontSize: 14,
                        maxWidth: "inherit",
                    }}
                    controlWidth={1}
                />
                <MultiSelectInput
                    label="Favorite Convenience"
                    inputType="favoriteConvenience"
                    require={true}
                    rootClasses="mb-6"
                    setFormInput={setFormInput}
                    formInput={formInput}
                    options={optionSegment}
                    styleControl={inputStyle}
                    styleSingleValue={{
                        display: "flex",
                        alignItems: "center",
                        fontSize: 14,
                        maxWidth: "inherit",
                    }}
                    controlWidth={1}
                />
                <MultiSelectInput
                    label="High Class Convenience"
                    inputType="highClassConvenience"
                    require={true}
                    rootClasses="mb-6"
                    setFormInput={setFormInput}
                    formInput={formInput}
                    options={optionSegment}
                    styleControl={inputStyle}
                    styleSingleValue={{
                        display: "flex",
                        alignItems: "center",
                        fontSize: 14,
                        maxWidth: "inherit",
                    }}
                    controlWidth={1}
                />
                <MultiSelectInput
                    label="Safe Convenience"
                    inputType="safeConvenience"
                    require={true}
                    rootClasses="mb-6"
                    setFormInput={setFormInput}
                    formInput={formInput}
                    options={optionSegment}
                    styleControl={inputStyle}
                    styleSingleValue={{
                        display: "flex",
                        alignItems: "center",
                        fontSize: 14,
                        maxWidth: "inherit",
                    }}
                    controlWidth={1}
                />
                <TimeInput
                    label="Opening Time"
                    setFormInput={setFormInput}
                    formInput={formInput}
                />
            </div>
            <ButtonDefault
                widthButton="w-140-custom"
                disabled={isDisabledButton()}
                onClick={onSubmitButton}
                style={{
                    minHeight: 37,
                }}
            >
                {/* {dataItem.id ? "Update" : "Add"} */}
                Add
            </ButtonDefault>
        </DialogCard>
    )
};

export default FormAddHost;