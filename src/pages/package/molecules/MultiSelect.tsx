import React from 'react';
import Multiselect from 'multiselect-react-dropdown';
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
            case "gymId":
                setFormInput({
                    ...formInput,
                    gymIds: values.map((value: any) => value.value)
                });
                break;
        }
    };

    const removeOptions = (values: any) => {
        switch (inputType) {
            case "gymId":
                setFormInput({
                    ...formInput,
                    gymIds: values.map((value: any) => value.value)
                });
                break;
        }
    }

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
                displayValue="label"
                onSelect={selectedOptions}
                onRemove={removeOptions}
                options={options}
                showArrow={true}
                hidePlaceholder={true}
            />
        </div>
    )
}

export default MultiSelectInput;