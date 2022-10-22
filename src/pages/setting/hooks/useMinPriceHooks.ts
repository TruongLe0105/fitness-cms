/* eslint-disable @typescript-eslint/no-explicit-any */
import { useBoolean, useString } from "helpers/hooks";
import React from "react";
import { STATUS_RESPONSE_CODE } from "types";
import { getSettingMiddleware, updateSettingMiddleware } from "../services/api";
import { SettingName, SettingType } from "../types";

const useMinPriceHooks = () => {
  const minPrice = useString("");
  const loading = useBoolean(false);

  const updateMinPrice = (newCost: number) => {
    loading.setValue(true);
    updateSettingMiddleware(
      "min price",
      SettingType.MINT_PRICE,
      SettingName.MIN_PRICE,
      { value: newCost },
      (status, value) => {
        if (status === STATUS_RESPONSE_CODE.SUCCESS && value) {
          minPrice.setValue(value);
        }
        loading.setValue(false);
      }
    );
  };

  React.useEffect(() => {
    loading.setValue(true);

    getSettingMiddleware(
      SettingType.MINT_PRICE,
      SettingName.MIN_PRICE,
      (status, value) => {
        if (status === STATUS_RESPONSE_CODE.SUCCESS && value) {
          minPrice.setValue(value);
        }
        loading.setValue(false);
      }
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return { isLoading: loading.value, minPrice, updateMinPrice };
};

export default useMinPriceHooks;
