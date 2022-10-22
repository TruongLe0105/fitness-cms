import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDay } from "@fortawesome/free-solid-svg-icons";
import moment from "moment";
const DatePickers = ({ from, to, onStartDateChange, onEndDateChange }) => {
  // const [from, setFrom] = useState(new Date());
  // const [to, setTo] = useState(new Date());

  // useEffect(() => {
  //   const startOfStartDate =
  //     moment(from).startOf("day").valueOf() + 1000 * 60 * 60 * 10;
  //   const startOfEndDate =
  //     moment(to).startOf("day").valueOf() + 1000 * 60 * 60 * 10;

  //   onStartDateChange(startOfStartDate);
  //   onEndDateChange(startOfEndDate);
  // }, [from, to]);
  return (
    <div className="flex p-16 relative space-x-5">
      <div>
        <span>From</span>
        <div className="flex justify-center items-center border-solid	border border-black rounded h-8">
          <FontAwesomeIcon icon={faCalendarDay} className="mx-2" />
          <DatePicker
            className="text-center p-3 w-40 rounded text-sm  outline-none  focus:ring-0 bg-transparent"
            selected={from}
            onChange={(newDate) => onStartDateChange(newDate)}
            selectsEnd
            dateFormat="MMMM d, yyyy "
          />
        </div>
      </div>
      <div>
        <span>To</span>
        <div className="flex justify-center items-center border-solid	border border-black rounded h-8">
          <FontAwesomeIcon icon={faCalendarDay} className="mx-2" />
          <DatePicker
            className="text-center p-3 w-40 rounded text-sm  outline-none  focus:ring-0 bg-transparent"
            selected={to}
            onChange={(newDate) => onEndDateChange(newDate)}
            selectsEnd
            dateFormat="MMMM d, yyyy "
          />
        </div>
      </div>
    </div>
  );
};

export default DatePickers;
