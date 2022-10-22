import React from "react";
import CurrencyInput from "react-currency-input-field";
import { CustomCurrencyInputProps } from "./types";

const CustomCurrencyInput = (props: CustomCurrencyInputProps): JSX.Element => {
  const {
    rootClass,
    classInput,
    onValueChange,
    value,
    decimalsLimit,
    disabled,
    onKeyPress,
    autoFocusInput,
  } = props;
  const classes = `h-8 border-b border-gray-custom focus:outline-none text-black font-semibold text-sm ${classInput}`;

  return (
    <div className={`flex flex-col relative ${rootClass}`}>
      <CurrencyInput
        autoFocus={autoFocusInput}
        onKeyPress={onKeyPress}
        disabled={disabled}
        className={`${classes}`}
        value={value}
        decimalsLimit={decimalsLimit ?? 6}
        onValueChange={onValueChange}
      />
    </div>
  );
};

export default CustomCurrencyInput;
