import { useBoolean, useString } from "helpers/hooks";
import React from "react";
import { STATUS_RESPONSE_CODE } from "types";
import { getSettingMiddleware, updateSettingMiddleware } from "../services/api";
import { SettingName, SettingType } from "../types";

const useMaxExpiryDateHooks = () => {
  const maxExpiryDate = useString("");
  const loading = useBoolean(false);

  const updateMaxExpiryDate = (newValue: number) => {
    loading.setValue(true);
    updateSettingMiddleware(
      "max expiry date",
      SettingType.MINT_PRICE,
      SettingName.MAX_EXPIRY_DATE,
      { value: newValue },
      (status, value) => {
        if (status === STATUS_RESPONSE_CODE.SUCCESS && value) {
          maxExpiryDate.setValue(value);
        }
        loading.setValue(false);
      }
    );
  };

  React.useEffect(() => {
    loading.setValue(true);

    getSettingMiddleware(
      SettingType.MINT_PRICE,
      SettingName.MAX_EXPIRY_DATE,
      (status, value) => {
        if (status === STATUS_RESPONSE_CODE.SUCCESS && value) {
          maxExpiryDate.setValue(value);
        }
        loading.setValue(false);
      }
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return { isLoading: loading.value, maxExpiryDate, updateMaxExpiryDate };
};

export default useMaxExpiryDateHooks;
