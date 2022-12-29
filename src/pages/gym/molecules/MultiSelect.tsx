import React, { useEffect, useState } from 'react';
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
        selectedValues,
        ...otherProps
    } = props;

    const [selected, setSelected] = useState<any>([]);

    const selectedOptions = (values: any) => {
        switch (inputType) {
            // case "merchantId":
            //     setFormInput({
            //         ...formInput,
            //         merchantId: values.map((value: any) => value._id)
            //     });
            //     break;
            case "subjects":
                setFormInput({
                    ...formInput,
                    subjects: values.map((value: any) => value._id)
                });
                break;
            case "basicConvenience":
                setFormInput({
                    ...formInput,
                    basicConvenience: values.map((value: any) => value._id)
                });
                break;
            case "favoriteConvenience":
                setFormInput({
                    ...formInput,
                    favoriteConvenience: values.map((value: any) => value._id)
                });
                break;
            case "highClassConvenience":
                setFormInput({
                    ...formInput,
                    highClassConvenience: values.map((value: any) => value._id)
                });
                break;
            case "safeConvenience":
                setFormInput({
                    ...formInput,
                    safeConvenience: values.map((value: any) => value._id)
                });
                break;
        }
    };

    const removeOptions = (values: any) => {
        switch (inputType) {
            // case "merchantId":
            //     setFormInput({
            //         ...formInput,
            //         merchantId: values.map((value: any) => value._id)
            //     });
            //     break;
            case "subjects":
                setFormInput({
                    ...formInput,
                    subjects: values.map((value: any) => value._id)
                });
                break;
            case "basicConvenience":
                setFormInput({
                    ...formInput,
                    basicConvenience: values.map((value: any) => value._id)
                });
                break;
            case "favoriteConvenience":
                setFormInput({
                    ...formInput,
                    favoriteConvenience: values.map((value: any) => value._id)
                });
                break;
            case "highClassConvenience":
                setFormInput({
                    ...formInput,
                    highClassConvenience: values.map((value: any) => value._id)
                });
                break;
            case "safeConvenience":
                setFormInput({
                    ...formInput,
                    safeConvenience: values.map((value: any) => value._id)
                });
                break;
        }
    }

    useEffect(() => {
        if (!selectedValues) return;
        const currentValues = selectedValues?.map((item: any) => item._id);
        options?.filter((option: any) => !currentValues.includes(option._id))
    }, [selectedValues, selected?.length]);


    const labelStyle = {
        marginBottom: "3px"
    }

    return (
        <div className={rootClasses}>
            {label ? (
                <Typography
                    fontWeight='font-semibold'
                    textColor='text-gray-custom'
                    textClass='text-xs'
                    style={labelStyle}
                >
                    {label}
                    {required && <span className='text-red-500'> (*)</span>}
                </Typography>
            ) : null}
            <Multiselect
                displayValue="name"
                onSelect={selectedOptions}
                onRemove={removeOptions}
                options={options}
                showArrow={true}
                selectedValues={selectedValues ? selectedValues : ""}
            />
        </div>
    )
}

export default MultiSelectInput;