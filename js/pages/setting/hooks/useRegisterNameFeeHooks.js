import { useBoolean, useString } from "helpers/hooks";
import React from "react";
import { STATUS_RESPONSE_CODE } from "types";
import { getSettingMiddleware, updateSettingMiddleware } from "../services/api";
import { SettingName, SettingType } from "../types";
const useRegisterNameFeeHooks = () => {
    const registerNameFee = useString("");
    const loading = useBoolean(false);
    const updateRegisterNameFee = (newCost) => {
        loading.setValue(true);
        updateSettingMiddleware("register name fee", SettingType.MINT_PRICE, SettingName.REGISTER_NAME, { value: newCost }, (status, value) => {
            if (status === STATUS_RESPONSE_CODE.SUCCESS && value) {
                registerNameFee.setValue(value);
            }
            loading.setValue(false);
        });
    };
    React.useEffect(() => {
        loading.setValue(true);
        getSettingMiddleware(SettingType.MINT_PRICE, SettingName.REGISTER_NAME, (status, value) => {
            if (status === STATUS_RESPONSE_CODE.SUCCESS && value) {
                registerNameFee.setValue(value);
            }
            loading.setValue(false);
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return { isLoading: loading.value, registerNameFee, updateRegisterNameFee };
};
export default useRegisterNameFeeHooks;
