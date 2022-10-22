import ButtonDefault from "components/Button/ButtonDefault";
import CustomCurrencyInput from "components/Input/CustomCurrencyInput";
import InputDefault from "components/Input/InputDefault";
import Typography from "components/Typography";
import { useString } from "helpers/hooks";
import React from "react";
const CostCard = ({ label, onSubmit, defaultValue, classes, style, usingInputNumber, }) => {
    const cost = useString(defaultValue);
    React.useEffect(() => {
        if (String(defaultValue) !== String(cost.value)) {
            cost.setValue(defaultValue);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [defaultValue]);
    const isDisabledBtn = () => {
        if (!cost.value || Number(cost.value) === Number(defaultValue)) {
            return true;
        }
        return false;
    };
    const onKeyPress = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            if (isDisabledBtn()) {
                return;
            }
            onSubmit(Number(cost.value));
        }
    };
    return (<div className={`${classes}`} style={style}>
      <Typography fontWeight="font-semibold" textColor="text-gray-custom" textClass="text-xs">
        {label}
      </Typography>
      {usingInputNumber ? (<InputDefault onKeyPress={onKeyPress} value={cost.value} onChange={(e) => cost.setValue(e.target.value ?? "")} type="number"/>) : (<CustomCurrencyInput onKeyPress={onKeyPress} value={cost.value} onValueChange={(newValue) => cost.setValue(newValue ?? "")}/>)}

      <div className="flex justify-start mt-4">
        <ButtonDefault disabled={isDisabledBtn()} widthButton="w-140-custom" onClick={() => onSubmit(Number(cost.value))}>
          Save
        </ButtonDefault>

        {String(cost.value) !== String(defaultValue) ? (<ButtonDefault widthButton="w-140-custom" onClick={() => cost.setValue(String(defaultValue))} buttonClass="btn-cancel ml-4">
            Reset
          </ButtonDefault>) : null}
      </div>
    </div>);
};
export default CostCard;
