import React, { useEffect, useState } from 'react';
import Multiselect from 'multiselect-react-dropdown';
import Typography from 'components/Typography';


const MultiSelectInput = (props): JSX.Element => {
    const {
        options,
        rootClasses,
        label,
        required,
        setFormInput,
        formInput,
        selectedValues,
        singleSelect,
        disable,
        inputType,
        ...otherProps
    } = props;

    const [selected, setSelected] = useState<any>([]);

    const selectedOptions = (values: any) => {
        switch (inputType) {
            case "user":
                setFormInput({
                    ...formInput,
                    includes: values.map(el => el.value)
                });
                break;
            case "gym":
                if (values?.value?.trim().length === 0) return;
                setFormInput({
                    ...formInput,
                    gym: values[0]?.value
                })
                break;
            case "package":
                if (values?.value?.trim().length === 0) return;
                setFormInput({
                    ...formInput,
                    package: values[0]?.value
                })
                break;
            case "event":
                if (values?.value?.trim().length === 0) return;
                setFormInput({
                    ...formInput,
                    event: values[0]?.value
                })
                break;
        }
    };

    const removeOptions = (values: any) => {
        setFormInput({
            ...formInput,
            includes: values.map(el => el.value)
        })
    };

    useEffect(() => {
        if (!selectedValues) return;
        const currentValues = selectedValues?.map((item: any) => item._id);
        options?.filter((option: any) => !currentValues.includes(option._id))
    }, [selectedValues, selected?.length, disable]);


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
                singleSelect={singleSelect}
                disable={disable}
                displayValue="label"
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