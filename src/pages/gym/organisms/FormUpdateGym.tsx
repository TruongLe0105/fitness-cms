import React, { useState, useEffect } from 'react';

import { useBoolean } from 'helpers/hooks';
// import { AddPackageInput } from '../types';
import { STATUS_RESPONSE_CODE } from 'types';
// import { addPackageMiddleware, updatePackageMiddleware } from '../services/api';
import DialogCard from 'components/Dialog/DialogCard';
import InputDefault from 'components/Input/InputDefault';
import ButtonDefault from 'components/Button/ButtonDefault';
import SelectDefault from 'components/Select/SelectDefault';
// import { TimePeriodTypeOptions, TypeOptions } from '../constant';
import { getGymMiddleware, updateGym } from 'pages/gym/services/api';
import { useSelector } from 'react-redux';
import MultiSelectInput from '../molecules/MultiSelect';
import { UpdateForm } from '../types';
import TimeInput from '../molecules/TimeWrapper';
import MultiImage from '../molecules/MultiImage';
import { isValidPhone } from 'helpers/util';
import { GOONG_MAP_API_KEY } from 'config/environments';
import { getSubjectMiddleware } from 'pages/subject/services/api';
import { getConvenienceMiddleware } from 'pages/convenience/services/api';
import { getMerchantMiddleware } from 'pages/merchant/services/api';
import { optionSegment } from '../constant';

const FormUpdateGym = (props: any) => {
    const { onClose, openFormChange, onRefetch, item } = props;
    const [result, setResult] = useState<any>();
    const [position, setPosition] = useState<any>();
    const [suggest, setSuggest] = useState<any>([]);
    const [currentSubjects, setCurrentSubjects] = useState<any>([]);

    const isLoading = useBoolean();
    const isChange = useBoolean();
    const { gyms, subjects, conveniences, merchants } = useSelector((state: any) => state.subject);

    const [optionGyms, setGyms] = useState<any>([]);

    useEffect(() => {
        getGymMiddleware();
        getSubjectMiddleware();
        getConvenienceMiddleware();
        getMerchantMiddleware();

        gyms?.map((gym: any) => {
            const newOps = {
                label: gym.name,
                value: gym._id
            }
            optionGyms.push(newOps)
        });

        const values = subjects?.filter((subject: any) => item?.subjects?.includes(subject?._id));
        setCurrentSubjects(values);
    }, [gyms.length, isChange.value, subjects.length]);

    const basicConvenience = conveniences?.filter((convenience: any) => convenience.type === "basic")
    const highClassConvenience = conveniences?.filter((convenience: any) => convenience.type === "highClass")
    const safeConvenience = conveniences?.filter((convenience: any) => convenience.type === "safe")
    const favoriteConvenience = conveniences?.filter((convenience: any) => convenience.type === "favorite")

    // console.log("safeConvenience", safeConvenience);

    const [formUpdate, setFormUpdate] = useState<UpdateForm>({
        id: item._id,
        name: item.name,
        phone: item.phone,
        description: item.description,
        segment: item.segment,
        address: item.address,
        openingTime: item.openingTime,
        long: item.long,
        lat: item.lat,
        subjects: item.subjects,
        basicConvenience: item.basicConvenience.map((el: any) => el._id),
        favoriteConvenience: item.favoriteConvenience.map((el: any) => el._id),
        highClassConvenience: item.highClassConvenience.map((el: any) => el._id),
        safeConvenience: item.safeConvenience.map((el: any) => el._id),
        rules: item.rules,
        medicalAndSafe: item.medicalAndSafe,
        images: item.images,
    });

    const isDisabledButton = () => {
        if (
            !formUpdate.name ||
            !isValidPhone(formUpdate.phone) ||
            !formUpdate.description ||
            !formUpdate.segment ||
            !formUpdate.address ||
            !formUpdate.long ||
            !formUpdate.lat ||
            formUpdate.subjects.length === 0 ||
            formUpdate.images.length === 0 ||
            formUpdate.basicConvenience.length === 0 ||
            formUpdate.highClassConvenience.length === 0 ||
            formUpdate.safeConvenience.length === 0
            // formUpdate.rules.length === 0 ||
            // formUpdate.medicalAndSafe.length === 0
        ) {
            return true;
        }
        return false;
    };


    const onSubmitButton = () => {
        console.log("formUpdate", formUpdate);
        isLoading.setValue(true);
        updateGym(formUpdate, (status: STATUS_RESPONSE_CODE) => {
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
        (key: "name" | "phone" | "description" | "position") =>
            (event: React.ChangeEvent<HTMLInputElement>) => {
                if (key === "position") {
                    const value = event.target.value;
                    setResult(value);
                    setPosition(value);

                    getPositionMap(value);
                } else {
                    setFormUpdate({
                        ...formUpdate,
                        [key]: event.target.value,
                    })
                }
            };

    const getPositionMap = async (e: string) => {
        await fetch(
            `https://rsapi.goong.io/Place/AutoComplete?api_key=${GOONG_MAP_API_KEY}&input=${e}`,
        )
            .then(response => response.json())
            .then(json => setSuggest(json.predictions))
    }

    const choosePosition = async (el: any) => {
        await fetch(
            `https://rsapi.goong.io/Place/Detail?api_key=${GOONG_MAP_API_KEY}&place_id=${el.place_id}`,
        )
            .then(response => response.json())
            .then(json => {
                const address = json.result.formatted_address;
                const location = json?.result?.geometry?.location;

                setFormUpdate({
                    ...formUpdate,
                    address: address,
                    long: location.lng + '',
                    lat: location.lat + ''
                });
                setResult(null);
                setPosition(address)
            })
    };

    const onSelectChange = (value: any) => {
        setFormUpdate({
            ...formUpdate,
            segment: value.value
        })
    };

    // const onSelectChangeMerchant = (value: any) => {
    //     console.log(value)
    //     setFormUpdate({
    //         ...formUpdate,
    //         merchantId: value.value
    //     })
    // };

    const getTypeValue = () => {
        const currentValue = optionSegment.find((el) => el.value === formUpdate.segment);
        return currentValue;
    };

    // const getTypeMerchant = () => {
    //     merchants?.find((el) => el.value === formUpdate.name)
    // };


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
            title="Update Gyms"
            size="md"
            rootStyle={{
                width: "90vw",
                maxHeight: "90vh",
                overflow: "auto",
            }}
        >
            <div className="grid grid-cols-3 mb-6 gap-5">
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
                    value={formUpdate.name}
                    onChange={handleChangeInput("name")}
                    // status={statusEmailInput}
                    onKeyPress={onKeyPress}
                />
                <div className="wrapper-suggest">
                    <InputDefault
                        inputStyle={inputStyle}
                        label="Specific Address"
                        required
                        rootClass="mb-6"
                        value={position}
                        onChange={handleChangeInput("position")}
                        // status={statusEmailInput}
                        onKeyPress={onKeyPress}
                    />
                    <div
                        className="modal-suggest"
                    >
                        {result && suggest?.map((el: any, index: any) => (
                            <div
                                key={index}
                                className='item-suggest'
                                onClick={() => choosePosition(el)}
                            >
                                {el.description}
                            </div>
                        ))}
                    </div>
                </div>
                <InputDefault
                    inputStyle={inputStyle}
                    label="Phone"
                    required
                    rootClass="mb-6"
                    value={formUpdate.phone}
                    onChange={handleChangeInput("phone")}
                    // status={statusEmailInput}
                    onKeyPress={onKeyPress}
                />
                <InputDefault
                    inputStyle={inputStyle}
                    label="Description"
                    required
                    rootClass="mb-6"
                    value={formUpdate.description}
                    onChange={handleChangeInput("description")}
                    // status={statusEmailInput}
                    onKeyPress={onKeyPress}
                />
                <InputDefault
                    inputStyle={inputStyle}
                    label="Address"
                    required
                    disabled={true}
                    classInput="disabled-input"
                    rootClass="mb-6"
                    value={formUpdate.address}
                    // status={statusEmailInput}
                    onKeyPress={onKeyPress}
                />
                <InputDefault
                    inputStyle={inputStyle}
                    label="Long"
                    required
                    disabled={true}
                    classInput="disabled-input"
                    rootClass="mb-6"
                    value={formUpdate.long}
                    // status={statusEmailInput}
                    onKeyPress={onKeyPress}
                />
                <InputDefault
                    inputStyle={inputStyle}
                    label="Lat"
                    required
                    disabled={true}
                    classInput="disabled-input"
                    rootClass="mb-6"
                    value={formUpdate.lat}
                    // status={statusEmailInput}
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
                    setFormInput={setFormUpdate}
                    formInput={formUpdate}
                    options={subjects}
                    selectedValues={currentSubjects}
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
                    setFormInput={setFormUpdate}
                    formInput={formUpdate}
                    options={basicConvenience}
                    selectedValues={item?.basicConvenience}
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
                    setFormInput={setFormUpdate}
                    formInput={formUpdate}
                    options={favoriteConvenience}
                    selectedValues={item?.favoriteConvenience}
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
                    setFormInput={setFormUpdate}
                    formInput={formUpdate}
                    options={highClassConvenience}
                    selectedValues={item?.highClassConvenience}
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
                    setFormInput={setFormUpdate}
                    formInput={formUpdate}
                    options={safeConvenience}
                    selectedValues={item?.safeConvenience}
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
                    setFormInput={setFormUpdate}
                    formInput={formUpdate}
                    gym={item.openingTime}
                    required
                />
            </div>
            <MultiImage
                required={true}
                setFormInput={setFormUpdate}
                formInput={formUpdate}
                currentImages={item.images}
            />
            <ButtonDefault
                widthButton="w-140-custom"
                disabled={isDisabledButton()}
                onClick={onSubmitButton}
                style={{
                    minHeight: 37,
                }}
            >
                Update
            </ButtonDefault>
        </DialogCard>
    )
}

export default FormUpdateGym;