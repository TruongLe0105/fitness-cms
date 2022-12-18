import Typography from 'components/Typography';
import React, { useState } from 'react';
import TimeField from 'react-simple-timefield';

const TimeInput = ({ label, setFormInput, formInput, required }) => {
    const [timeFrom, setTimeFrom] = useState<any>();
    const [timeTo, setTimeTo] = useState<any>();

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
        console.log("time", time)
        const newTime = time.split(":");
        console.log("newTime", newTime)
        setFormInput({
            ...formInput,
            openingTime: { ...formInput.openingTime, from: event.target.value }
        })
    }

    const onChangeTimeTo = (event: any, time: any) => {
        setFormInput({
            ...formInput,
            openingTime: { ...formInput.openingTime, to: event.target.value }
        })
    };

    const handleChangeTime = (event: any, type: string) => {
        const currentTime = Number(event.target.value);
        console.log(currentTime)
        if (type === "from") {
            if (currentTime === 0) {
                setTimeFrom("");
                setFormInput({
                    ...formInput,
                    openingTime: { ...formInput.openingTime, from: 0 }
                });
            } else if (currentTime > 24) {
                setTimeFrom(24);
                setFormInput({
                    ...formInput,
                    openingTime: { ...formInput.openingTime, from: 24 }
                });
            } else {
                setTimeFrom(currentTime);
                setFormInput({
                    ...formInput,
                    openingTime: { ...formInput.openingTime, from: currentTime }
                });
            }
        }
        if (type === "to") {
            if (currentTime === 0) {
                setTimeTo("");
                setFormInput({
                    ...formInput,
                    openingTime: { ...formInput.openingTime, to: 0 }
                });
            }
            else if (currentTime > 24) {
                setTimeTo(24);
                setFormInput({
                    ...formInput,
                    openingTime: { ...formInput.openingTime, to: 24 }
                });
            } else {
                setTimeTo(currentTime);
                setFormInput({
                    ...formInput,
                    openingTime: { ...formInput.openingTime, to: currentTime }
                });
            }
        }
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
                <input style={styleInput} value={timeFrom} onChange={(event) => handleChangeTime(event, "from")} type="number" min={0} max={24} autoComplete='false' />
                {/* <TimeField
                    value={formInput?.openingTime?.from}
                    onChange={onChangeTimeFrom}
                    style={styleInput}
                /> */}
                <label style={labelStyle}>To</label>
                <input style={styleInput} value={timeTo} onChange={(event) => handleChangeTime(event, "to")} type="number" min={0} max={24} />
                {/* <TimeField
                    value={formInput?.openingTime?.to}
                    onChange={onChangeTimeTo}
                    style={styleInput}
                /> */}
            </div>

        </div >
    );
};

export default TimeInput;