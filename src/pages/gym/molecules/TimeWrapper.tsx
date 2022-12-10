import React from 'react';
import TimeField from 'react-simple-timefield';

const TimeInput = ({ label, setFormInput, formInput }) => {

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
        fontWeight: "600"
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
                <p className="text-sm font-semibold text-gray-custom text-xs">{label}</p>
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

        </div>
    );
};

export default TimeInput;