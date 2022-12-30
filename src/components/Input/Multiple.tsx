import Typography from "components/Typography";
import { TextareaProps } from "./types";

const MultipleInput = (props: TextareaProps): JSX.Element => {
  const { label, value, rootClass, classInput, required, inputStyle, ...otherProps } =
    props;

  const classes = `border-b focus:outline-none text-black font-semibold text-sm ${classInput}`;

  const areaStyle = {
    border: "1px solid #e5e5e5",
    borderRadius: "8px",
    padding: "10px"
  };

  return (
    <div className={`flex flex-col relative ${rootClass}`}>
      {label ? (
        <Typography
          fontWeight="font-semibold"
          textColor="text-gray-custom"
          textClass="text-xs mb-1"
        >
          {label}
          {required && <span className="text-red-500"> (*)</span>}
        </Typography>
      ) : null}
      <textarea
        value={value}
        className={classes}
        {...otherProps}
        style={areaStyle}
      />
    </div>
  );
};

export default MultipleInput;
