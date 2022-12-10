import React from 'react';
import Multiselect from 'multiselect-react-dropdown';
import { optionSegment } from '../constant';
import { SegmentModelOption } from '../types';
import Typography from 'components/Typography';


const MultiSelectInput = (props): JSX.Element => {
    const {
        options,
        rootClasses,
        label,
        inputType,
        required,
        setFormInput,
        formInput,
        ...otherProps
    } = props;

    const selectedOptions = (values: any) => {
        switch (inputType) {
            case "merchantId":
                setFormInput({
                    ...formInput,
                    merchantId: values.map((value: any) => value.value)
                });
                break;
            case "subjects":
                setFormInput({
                    ...formInput,
                    subjects: values.map((value: any) => value.value)
                });
                break;
            case "basicConvenience":
                setFormInput({
                    ...formInput,
                    basicConvenience: values.map((value: any) => value.value)
                });
                break;
            case "favoriteConvenience":
                setFormInput({
                    ...formInput,
                    favoriteConvenience: values.map((value: any) => value.value)
                });
                break;
            case "highClassConvenience":
                setFormInput({
                    ...formInput,
                    highClassConvenience: values.map((value: any) => value.value)
                });
                break;
            case "safeConvenience":
                setFormInput({
                    ...formInput,
                    safeConvenience: values.map((value: any) => value.value)
                });
                break;
        }
    };

    const removeOptions = (values: any) => {
        switch (inputType) {
            case "merchantId":
                setFormInput({
                    ...formInput,
                    merchantId: values.map((value: any) => value.value)
                });
                break;
            case "subjects":
                setFormInput({
                    ...formInput,
                    subjects: values.map((value: any) => value.value)
                });
                break;
            case "basicConvenience":
                setFormInput({
                    ...formInput,
                    basicConvenience: values.map((value: any) => value.value)
                });
                break;
            case "favoriteConvenience":
                setFormInput({
                    ...formInput,
                    favoriteConvenience: values.map((value: any) => value.value)
                });
                break;
            case "highClassConvenience":
                setFormInput({
                    ...formInput,
                    highClassConvenience: values.map((value: any) => value.value)
                });
                break;
            case "safeConvenience":
                setFormInput({
                    ...formInput,
                    safeConvenience: values.map((value: any) => value.value)
                });
                break;
        }
    }

    return (
        <div className={rootClasses}>
            {label ? (
                <Typography
                    fontWeight='font-semibold'
                    textColor='text-gray-custom'
                    textClass='text-xs'
                // style={labelStyle}
                >
                    {label}
                    {required && <span className='text-red-500'> (*)</span>}
                </Typography>
            ) : null}
            <Multiselect
                displayValue="label"
                onSelect={selectedOptions}
                onRemove={removeOptions}
                options={options}
                showArrow={true}
                style={{
                    padding: "0 !important",
                    height: 20,
                    background: "red"
                }}
            />
        </div>
    )
}

export default MultiSelectInput;