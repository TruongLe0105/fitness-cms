import Typography from "components/Typography";
import { STATUS_INPUT } from "./types";
import { ReactComponent as WarningIcon } from "assets/images/icons/icon-error-input.svg";
import Tooltip from "components/Tooltip";
const InputDefault = (props) => {
    const { status, label, value, rootClass, childrenIcon, classInput, tooltipId, tooltipLabel, required, inputStyle, rootStyle, ...otherProps } = props;
    const renderBorderColorInput = () => {
        switch (status) {
            case STATUS_INPUT.ERROR:
                return "border-red-custom";
            case STATUS_INPUT.VALID:
                return "border-green-custom";
            default:
                return "border-gray-custom";
        }
    };
    const classes = `h-8 border-b ${renderBorderColorInput()} focus:outline-none text-black font-semibold text-sm ${classInput}`;
    return (<div className={`flex flex-col relative ${rootClass}`} style={rootStyle}>
      <div className={`${Boolean(tooltipId) && "flex items-center"}`}>
        {label ? (<Typography textColor="text-black" textClass="text-xs">
            {label}
            {required && <span className="text-red-500"> (*)</span>}
          </Typography>) : null}
        {Boolean(tooltipId) && (<div data-tip data-for={tooltipId} className="bg-active-tooltip ml-1 cursor-pointer">
            <WarningIcon className="w-20-custom h-20-custom"/>
            <Tooltip id={tooltipId} text={tooltipLabel}/>
          </div>)}
      </div>

      <input 
    // placeholder={placeholder}
    value={value} {...otherProps} className={`${classes}`} style={inputStyle}/>

      <div className="absolute right-0 bottom-2 cursor-pointer	">
        {childrenIcon}
      </div>
    </div>);
};
export default InputDefault;
