import React, { useState, useEffect } from 'react';

import { useBoolean } from 'helpers/hooks';
import { AddPackageInput } from '../types';
import { STATUS_RESPONSE_CODE } from 'types';
import { addPackageMiddleware } from '../services/api';
import DialogCard from 'components/Dialog/DialogCard';
import InputDefault from 'components/Input/InputDefault';
import ButtonDefault from 'components/Button/ButtonDefault';
import SelectDefault from 'components/Select/SelectDefault';
import { TimePeriodTypeOptions, TypeOptions } from '../constant';
import { getGymMiddleware } from 'pages/gym/services/api';
import { useSelector } from 'react-redux';
import MultiSelectInput from '../molecules/MultiSelect';
import MultipleInput from 'components/Input/Multiple';

const FormAddPackage = (props: any) => {
    const { onClose, openFormChange, onRefetch } = props;

    const isLoading = useBoolean();
    const { gyms } = useSelector((state: any) => state.subject);

    const [optionGyms, setGyms] = useState<any>([]);
    const [formInput, setFormInput] = useState<AddPackageInput>({
        name: "",
        description: "",
        price: 0,
        timePeriodType: "",
        unitTime: 0,
        gymId: [],
        type: "",
        benefit: [],
        rules: [],
    });

    useEffect(() => {
        getGymMiddleware();
        gyms?.map((gym: any) => {
            const newOps = {
                label: gym.name,
                value: gym._id
            }
            optionGyms.push(newOps)
        })
    }, [gyms.length]);

    const isDisabledButton = () => {
        if (
            !formInput.name ||
            !formInput.description ||
            !formInput.price ||
            !formInput.timePeriodType ||
            !formInput.unitTime ||
            !formInput.gymId.length ||
            !formInput.type ||
            !formInput.benefit ||
            !formInput.rules
        ) {
            return true;
        }
        return false;
    };

    const onSubmitButton = () => {
        console.log(formInput);
        isLoading.setValue(true);
        addPackageMiddleware(formInput, (status: STATUS_RESPONSE_CODE) => {
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
        (key: "name" | "description" | "price" | "unitTime") =>
            (event: React.ChangeEvent<HTMLInputElement>) => {
                if (key === "price" || key === "unitTime") {
                    setFormInput({
                        ...formInput,
                        [key]: Number(event.target.value),
                    });
                } else {
                    setFormInput({
                        ...formInput,
                        [key]: event.target.value,
                    });
                }
            };

    const handleChangeInputArea =
        (key: "benefit" | "rules") =>
            (event: React.ChangeEvent<HTMLTextAreaElement>) => {
                setFormInput({
                    ...formInput,
                    [key]: [event.target.value],
                });
            }

    const getTypeTimePeriod = () => {
        TimePeriodTypeOptions.find((el) => el.value === formInput.timePeriodType)
    };

    const getTypeOptions = () => {
        TimePeriodTypeOptions.find((el) => el.value === formInput.type)
    };

    const onSelectChangeTimeType = (value: any) => {
        setFormInput({
            ...formInput,
            timePeriodType: value.value
        })
    };

    const onSelectChangeType = (value: any) => {
        setFormInput({
            ...formInput,
            type: value.value
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
            title="Add New Package"
        // rootStyle={{
        //     width: "400px"
        // }}
        >
            <div className="grid grid-cols-3 mb-8 gap-5"
            >
                <SelectDefault
                    label="Time Period Type"
                    required
                    options={TimePeriodTypeOptions}
                    selectedOption={getTypeTimePeriod()}
                    handleChange={onSelectChangeTimeType}
                    styleControl={inputStyle}
                    styleSingleValue={{
                        display: "flex",
                        alignItems: "center",
                        fontSize: 12,
                        maxWidth: "inherit",
                    }}
                    controlWidth={1}
                />
                <SelectDefault
                    label="Type"
                    required
                    options={TypeOptions}
                    selectedOption={getTypeOptions()}
                    handleChange={onSelectChangeType}
                    styleControl={inputStyle}
                    styleSingleValue={{
                        display: "flex",
                        alignItems: "center",
                        fontSize: 14,
                        maxWidth: "inherit",
                    }}
                    controlWidth={1}
                />
                {/* <SelectDefault
                    label="Gym"
                    required
                    options={optionGyms}
                    selectedOption={getTypeGym()}
                    handleChange={onSelectChangeGym}
                    styleControl={inputStyle}
                    styleSingleValue={{
                        display: "flex",
                        alignItems: "center",
                        fontSize: 14,
                        maxWidth: "inherit",
                    }}
                    controlWidth={1}
                /> */}
                <MultiSelectInput
                    label="Gym"
                    inputType="gymId"
                    required
                    setFormInput={setFormInput}
                    formInput={formInput}
                    options={optionGyms}
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
            <div className="grid grid-cols-4 mb-6 gap-5">
                <InputDefault
                    inputStyle={inputStyle}
                    label="Name"
                    required
                    rootClass="mb-6"
                    value={formInput.name}
                    onChange={handleChangeInput("name")}
                    onKeyPress={onKeyPress}
                />
                <InputDefault
                    inputStyle={inputStyle}
                    label="Description"
                    required
                    rootClass="mb-6"
                    value={formInput.description}
                    onChange={handleChangeInput("description")}
                    onKeyPress={onKeyPress}
                />
                <InputDefault
                    inputStyle={inputStyle}
                    label="Price"
                    type="number"
                    required
                    rootClass="mb-6"
                    value={formInput.price}
                    onChange={handleChangeInput("price")}
                    onKeyPress={onKeyPress}
                />
                <InputDefault
                    inputStyle={inputStyle}
                    label="Unit Time"
                    type="number"
                    required
                    rootClass="mb-6"
                    value={formInput.unitTime}
                    onChange={handleChangeInput("unitTime")}
                    onKeyPress={onKeyPress}
                />
            </div>
            <div className="grid grid-cols-2 mb-8 gap-5">
                {/* <MultiSelectInput
                    label="Benefit"
                    inputType="benefit"
                    required
                    setFormInput={setFormInput}
                    formInput={formInput}
                    options={optionGyms}
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
                    label="Rules"
                    inputType="rules"
                    required
                    setFormInput={setFormInput}
                    formInput={formInput}
                    options={optionGyms}
                    styleControl={inputStyle}
                    styleSingleValue={{
                        display: "flex",
                        alignItems: "center",
                        fontSize: 14,
                        maxWidth: "inherit",
                    }}
                    controlWidth={1}
                /> */}
                <MultipleInput
                    label="Benefit"
                    // value=""
                    rows={4}
                    onChange={handleChangeInputArea("benefit")}
                />
                <MultipleInput
                    label="Rules"
                    // value=""
                    rows={4}
                    onChange={handleChangeInputArea("rules")}
                />
            </div>
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
}

export default FormAddPackage