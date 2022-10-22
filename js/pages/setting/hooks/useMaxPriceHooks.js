/* eslint-disable @typescript-eslint/no-explicit-any */
import { useBoolean, useString } from "helpers/hooks";
import React from "react";
import { STATUS_RESPONSE_CODE } from "types";
import { getSettingMiddleware, updateSettingMiddleware } from "../services/api";
import { SettingName, SettingType } from "../types";
const useMaxPriceHooks = () => {
    const maxPrice = useString("");
    const loading = useBoolean(false);
    const updateMaxPrice = (newCost) => {
        loading.setValue(true);
        updateSettingMiddleware("max price", SettingType.MINT_PRICE, SettingName.MAX_PRICE, { value: newCost }, (status, value) => {
            if (status === STATUS_RESPONSE_CODE.SUCCESS && value) {
                maxPrice.setValue(value);
            }
            loading.setValue(false);
        });
    };
    React.useEffect(() => {
        loading.setValue(true);
        getSettingMiddleware(SettingType.MINT_PRICE, SettingName.MAX_PRICE, (status, value) => {
            if (status === STATUS_RESPONSE_CODE.SUCCESS && value) {
                maxPrice.setValue(value);
            }
            loading.setValue(false);
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return { isLoading: loading.value, maxPrice, updateMaxPrice };
};
export default useMaxPriceHooks;
