import React, { useState, useEffect } from 'react';

import { useBoolean } from 'helpers/hooks';
import { UpdatePackageInput } from '../types';
import { STATUS_RESPONSE_CODE } from 'types';
import { addPackageMiddleware, updatePackageMiddleware } from '../services/api';
import DialogCard from 'components/Dialog/DialogCard';
import InputDefault from 'components/Input/InputDefault';
import ButtonDefault from 'components/Button/ButtonDefault';
import SelectDefault from 'components/Select/SelectDefault';
import { TimePeriodTypeOptions, TypeOptions } from '../constant';
import { getGymMiddleware } from 'pages/gym/services/api';
import { useSelector } from 'react-redux';
import MultiSelectInput from '../molecules/MultiSelect';
import MultipleInput from 'components/Input/Multiple';

const FormUpdatePackage = (props: any) => {
    const { onClose, openFormChange, onRefetch, item } = props;

    const isLoading = useBoolean();
    const isChange = useBoolean();
    const { gyms } = useSelector((state: any) => state.subject);

    const [optionGyms, setGyms] = useState<any>([]);
    const [formUpdate, setformUpdate] = useState<UpdatePackageInput>({
        id: item._id,
        name: item.name,
        description: item.description,
        price: item.price,
        gymIds: item.gym,
        type: item.type,
        benefit: item.benefit,
        rules: item.rules,
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
    }, [gyms.length, isChange.value]);

    console.log("formUpdate:", formUpdate)
    console.log("item:", item)

    const isDisabledButton = () => {
        if (
            !formUpdate.name ||
            !formUpdate.description ||
            !formUpdate.price ||
            // !formUpdate.timePeriodType ||
            // !formUpdate.unitTime ||
            !formUpdate.gymIds?.length ||
            !formUpdate.type ||
            !formUpdate.benefit ||
            !formUpdate.rules ||
            !isChange.value
        ) {
            return true;
        }
        return false;
    };

    const onSubmitButton = () => {
        console.log(formUpdate);
        isLoading.setValue(true);
        updatePackageMiddleware(formUpdate, (status: STATUS_RESPONSE_CODE) => {
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
                    setformUpdate({
                        ...formUpdate,
                        [key]: Number(event.target.value),
                    });
                } else {
                    setformUpdate({
                        ...formUpdate,
                        [key]: event.target.value,
                    });
                }
                isChange.setValue(true);
            };

    const handleChangeInputArea =
        (key: "benefit" | "rules") =>
            (event: React.ChangeEvent<HTMLTextAreaElement>) => {
                setformUpdate({
                    ...formUpdate,
                    [key]: [event.target.value],
                })
                isChange.setValue(true);
            }

    const getTypeOptions = () => {
        const currentType = TypeOptions.find((el) => el.value === formUpdate.type);
        return currentType;
    };

    const onSelectChangeType = (value: any) => {
        setformUpdate({
            ...formUpdate,
            type: value.value
        });
        isChange.setValue(true);
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
            title="Update Package"
        // rootStyle={{
        //     width: "400px"
        // }}
        >
            <div className="grid grid-cols-2 mb-6 gap-5">
                <InputDefault
                    inputStyle={inputStyle}
                    label="Name"
                    required
                    rootClass="mb-6"
                    value={formUpdate.name}
                    onChange={handleChangeInput("name")}
                    onKeyPress={onKeyPress}
                />
                <InputDefault
                    inputStyle={inputStyle}
                    label="Description"
                    required
                    rootClass="mb-6"
                    value={formUpdate.description}
                    onChange={handleChangeInput("description")}
                    onKeyPress={onKeyPress}
                />
            </div>
            <div className="grid grid-cols-2 mb-8 gap-5"
            >
                {/* <SelectDefault
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
                /> */}
                {/* <MultiSelectInput
                    label="Gym"
                    inputType="gymId"
                    required
                    setformUpdate={setformUpdate}
                    formUpdate={formUpdate}
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
            </div>
            <div className="grid grid-cols-2 mb-8 gap-5">
                <InputDefault
                    inputStyle={inputStyle}
                    label="Price"
                    type="number"
                    required
                    rootClass="mb-6"
                    value={formUpdate.price}
                    onChange={handleChangeInput("price")}
                    onKeyPress={onKeyPress}
                />
                {/* <InputDefault
                    inputStyle={inputStyle}
                    label="Unit Time"
                    type="number"
                    required
                    rootClass="mb-6"
                    value={formUpdate.unitTime}
                    onChange={handleChangeInput("unitTime")}
                    onKeyPress={onKeyPress}
                /> */}
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
                {/* <MultiSelectInput
                    label="Benefit"
                    inputType="benefit"
                    required
                    setformUpdate={setformUpdate}
                    formUpdate={formUpdate}
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
                    setformUpdate={setformUpdate}
                    formUpdate={formUpdate}
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
                    rows={5}
                    onChange={handleChangeInputArea("benefit")}
                />
                <MultipleInput
                    label="Rules"
                    // value=""
                    rows={5}
                    onChange={handleChangeInputArea("rules")}
                />
            </div>
            <ButtonDefault
                widthButton="w-140-custom"
                disabled={isDisabledButton()}
                onClick={onSubmitButton}
            >
                Update
            </ButtonDefault>
        </DialogCard>
    )
}

export default FormUpdatePackage;