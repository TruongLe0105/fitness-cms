import { useBoolean, useString } from "helpers/hooks";
import React from "react";
import { STATUS_RESPONSE_CODE } from "types";
import { getSettingMiddleware, updateSettingMiddleware } from "../services/api";
import { SettingName, SettingType } from "../types";
const useRewardHooks = () => {
    const reward = useString("");
    const loading = useBoolean(false);
    const updateReward = (newCost) => {
        loading.setValue(true);
        updateSettingMiddleware("Reward", SettingType.REFERRAL, SettingName.REWARD, {
            value: newCost,
        }, (status, value) => {
            if (status === STATUS_RESPONSE_CODE.SUCCESS && value) {
                reward.setValue(value);
            }
            loading.setValue(false);
        });
    };
    React.useEffect(() => {
        loading.setValue(true);
        getSettingMiddleware(SettingType.REFERRAL, SettingName.REWARD, (status, value) => {
            if (status === STATUS_RESPONSE_CODE.SUCCESS && value) {
                reward.setValue(value);
            }
            loading.setValue(false);
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return { isLoading: loading.value, reward, updateReward };
};
export default useRewardHooks;
