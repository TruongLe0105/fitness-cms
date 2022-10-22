import { useBoolean, useString } from "helpers/hooks";
import React from "react";
import { STATUS_RESPONSE_CODE } from "types";
import { getSettingMiddleware, updateSettingMiddleware } from "../services/api";
import { SettingName, SettingType } from "../types";
const useStarCostHooks = () => {
    const starCost = useString("");
    const loading = useBoolean(false);
    const updateStarCost = (newCost) => {
        loading.setValue(true);
        updateSettingMiddleware("mint star cost", SettingType.MINT_PRICE, SettingName.STAR, { value: newCost }, (status, value) => {
            if (status === STATUS_RESPONSE_CODE.SUCCESS && value) {
                starCost.setValue(value);
            }
            loading.setValue(false);
        });
    };
    React.useEffect(() => {
        loading.setValue(true);
        getSettingMiddleware(SettingType.MINT_PRICE, SettingName.STAR, (status, value) => {
            if (status === STATUS_RESPONSE_CODE.SUCCESS && value) {
                starCost.setValue(value);
            }
            loading.setValue(false);
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return { isLoading: loading.value, starCost, updateStarCost };
};
export default useStarCostHooks;
