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
        console.log("values", values);
        switch (inputType) {
            case "user":
                setFormInput({
                    ...formInput,
                    includes: values.map(el => el.value)
                });
                break;
            case "gym":
                setFormInput({
                    ...formInput,
                    gym: values[0]?.value
                })
                break;
            case "package":
                setFormInput({
                    ...formInput,
                    package: values[0]?.value
                })
        }
    };

    const removeOptions = (values: any) => {
        console.log("values", values);
        setFormInput({
            ...formInput,
            includes: values.map(el => el.value)
        })
    };

    console.log("options", options);


    useEffect(() => {
        if (!selectedValues) return;
        const currentValues = selectedValues?.map((item: any) => item._id);
        options?.filter((option: any) => !currentValues.includes(option._id))
    }, [selectedValues, selected?.length, disable]);


    const labelStyle = {
        marginBottom: "3px"
    }

    console.log("disable", disable);


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