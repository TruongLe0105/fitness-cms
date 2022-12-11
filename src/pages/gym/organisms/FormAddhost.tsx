import ButtonDefault from "components/Button/ButtonDefault";
import DialogCard from "components/Dialog/DialogCard";
import InputDefault from "components/Input/InputDefault";
import { STATUS_INPUT } from "components/Input/types";
import SelectDefault from "components/Select/SelectDefault";
import { useBoolean, useString } from "helpers/hooks";
import { isValidPhone } from "helpers/util";
import { getConvenienceMiddleware } from "pages/convenience/services/api";
import { getMerchantMiddleware } from "pages/merchant/services/api";
import { getSubjectMiddleware } from "pages/subject/services/api";
import React, { FC, useState } from "react";
import { useSelector } from "react-redux";
import { STATUS_RESPONSE_CODE } from "types";
import { optionSegment } from "../constant";
import MultiImage from "../molecules/MultiImage";
import MultiSelectInput from "../molecules/MultiSelect";
import TimeInput from "../molecules/TimeWrapper";
import { addNewHostMiddleware } from "../services/api";
import { FormAddHostProps, InputHost } from "../types";

const FormAddHost: FC<FormAddHostProps> = (props) => {
    const { onClose, openFormChange, handleUpdateList } = props;
    const { subjects, conveniences, merchants } = useSelector((state: any) => state.subject);

    const merchantName = useString();
    const segment = useString();
    const isLoading = useBoolean();

    const [options, setOptions] = useState<any>([]);

    React.useEffect(() => {
        getSubjectMiddleware();
        getConvenienceMiddleware();
        getMerchantMiddleware();

        merchants?.map((merchant: any) => {
            const newOps = {
                label: merchant.name,
                value: merchant._id
            }
            options.push(newOps)
        })
    }, [merchants.length]);

    const basicConvenience = conveniences?.filter((convenience) => convenience.type === "basic")
    const highClassConvenience = conveniences?.filter((convenience) => convenience.type === "highClass")
    const safeConvenience = conveniences?.filter((convenience) => convenience.type === "safe")
    const favoriteConvenience = conveniences?.filter((convenience) => convenience.type === "favorite")

    const [formInput, setFormInput] = useState<InputHost>({
        name: "",
        phone: "",
        description: "",
        segment: "",
        address: "",
        long: "",
        lat: "",
        merchantId: "",
        openingTime: {
            from: 0,
            to: 0
        },
        images: [],
        subjects: [],
        basicConvenience: [],
        favoriteConvenience: [],
        highClassConvenience: [],
        safeConvenience: [],
        rules: [{
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
            !isValidPhone(formInput.phone) ||
            !formInput.description ||
            !formInput.segment ||
            !formInput.address ||
            !formInput.long ||
            !formInput.lat ||
            !formInput.merchantId ||
            !formInput.subjects.length ||
            !formInput.images.length ||
            !formInput.basicConvenience.length ||
            !formInput.highClassConvenience.length ||
            !formInput.safeConvenience.length ||
            !formInput.rules.length ||
            !formInput.medicalAndSafe.length
        ) {
            return true;
        }
        return false;
    };

    const onSubmitButton = () => {
        // console.log("formInsubmit", JSON.stringify(formInput))
        console.log("formInsubmit", formInput)
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
        (key: "name" | "phone" | "description" | "address" | "long" | "lat") =>
            (event: React.ChangeEvent<HTMLInputElement>) => {
                setFormInput({
                    ...formInput,
                    [key]: event.target.value,
                })
            };

    const onSelectChange = (value: any) => {
        setFormInput({
            ...formInput,
            segment: value.value
        })
    };

    const onSelectChangeMerchant = (value: any) => {
        console.log(value)
        setFormInput({
            ...formInput,
            merchantId: value.value
        })
    };

    const getTypeValue = () => {
        optionSegment.find((el) => el.value === segment.value)
    };

    const getTypeMerchant = () => {
        merchants?.find((el) => el.value === merchantName.value)
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
            title="Add New Gym"
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
                    label="Merchant"
                    required
                    options={options}
                    selectedOption={getTypeMerchant()}
                    handleChange={onSelectChangeMerchant}
                    styleControl={inputStyle}
                    styleSingleValue={{
                        display: "flex",
                        alignItems: "center",
                        fontSize: 14,
                        maxWidth: "inherit",
                    }}
                    controlWidth={1}
                />
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
                    label="Subjects"
                    inputType="subjects"
                    required
                    rootClasses="mb-6"
                    setFormInput={setFormInput}
                    formInput={formInput}
                    options={subjects}
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
                    required
                    rootClasses="mb-6"
                    setFormInput={setFormInput}
                    formInput={formInput}
                    options={basicConvenience}
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
                    required
                    rootClasses="mb-6"
                    setFormInput={setFormInput}
                    formInput={formInput}
                    options={favoriteConvenience}
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
                    required
                    rootClasses="mb-6"
                    setFormInput={setFormInput}
                    formInput={formInput}
                    options={highClassConvenience}
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
                    required
                    rootClasses="mb-6"
                    setFormInput={setFormInput}
                    formInput={formInput}
                    options={safeConvenience}
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
                    required
                />
            </div>
            <MultiImage
                required={true}
                setFormInput={setFormInput}
                formInput={formInput}
            />
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