import Typography from "components/Typography";
const MultipleInput = (props) => {
    const { label, value, rootClass, classInput, inputStyle, ...otherProps } = props;
    const classes = `border-b focus:outline-none text-black font-semibold text-sm ${classInput}`;
    return (<div className={`flex flex-col relative ${rootClass}`}>
      {label ? (<Typography fontWeight="font-semibold" textColor="text-gray-custom" textClass="text-xs mb-1">
          {label}
        </Typography>) : null}
      <textarea value={value} className={classes} {...otherProps} style={inputStyle}/>
    </div>);
};
export default MultipleInput;
