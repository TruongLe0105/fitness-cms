import Typography from 'components/Typography';
import React from 'react';
import TimeField from 'react-simple-timefield';

const TimeInput = ({ label, setFormInput, formInput, required }) => {

    const styleInput = {
        backgroundColor: "rgba(96, 108, 110, 0.15)",
        height: "40px",
        padding: "10px 10px",
        color: "#606c6e",
        fontSize: "14px",
        outline: "0 solid transparent",
        border: "0 solid transparent",
        width: "20%",
        borderRadius: "4px",
        letterSpacing: "-0.4px",
        margin: "0 10px"
    };

    const labelStyle = {
        fontSize: "15px",
        color: "rgba(161, 169, 180, var(--tw-text-opacity))"
    };

    const onChangeTimeFrom = (event: any, time: any) => {
        setFormInput({
            ...formInput,
            openingTime: { ...formInput.openingTime, from: 8 }
        })
    }

    const onChangeTimeTo = (event: any, time: any) => {
        setFormInput({
            ...formInput,
            openingTime: { ...formInput.openingTime, to: 12 }
        })
    }

    return (
        <div className='mb-6'>
            {
                label &&
                (
                    < Typography
                        fontWeight='font-semibold'
                        textColor='text-gray-custom'
                        textClass='text-xs'
                        style={{
                            display: "flex",
                            marginBottom: "3px"
                        }}
                    >
                        <p className="text-sm font-semibold text-gray-custom text-xs">{label}</p>
                        {required && <span className='text-red-500 ml-1'> (*)</span>}
                    </Typography>
                )
            }
            <div >
                <label style={labelStyle}>From</label>
                <TimeField
                    value={formInput.openingTime.from}
                    onChange={onChangeTimeFrom}
                    style={styleInput}
                />
                <label style={labelStyle}>To</label>
                <TimeField
                    value={formInput.openingTime.to}
                    onChange={onChangeTimeTo}
                    style={styleInput}
                />
            </div>

        </div >
    );
};

export default TimeInput;