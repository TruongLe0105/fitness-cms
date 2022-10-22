import Typography from "components/Typography";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
const InputDatePicker = (props) => {
    const { classInput, label, rootClass, inputDate, setInputDate, dateFormat, hideTimeSelect, required, } = props;
    return (<div className={`flex flex-col custom-date-picker relative ${rootClass}`}>
      {label ? (<Typography fontWeight="font-semibold" textColor="text-gray-custom" textClass="text-xs">
          {label}
          {required && <span className="text-red-500"> (*)</span>}
        </Typography>) : null}
      <DatePicker className={`h-8 border-b focus:outline-none text-black font-semibold text-sm w-full ${classInput}`} selected={inputDate} onChange={(date) => setInputDate(date)} showTimeSelect={!hideTimeSelect} minDate={new Date()} // add this in your date componet
     dateFormat={dateFormat || "dd MMM yyyy, hh:mm:ss a"}/>
    </div>);
};
export default InputDatePicker;
