import { useBoolean, useString } from "helpers/hooks";
import React from "react";
import { STATUS_RESPONSE_CODE } from "types";
import { getSettingMiddleware, updateSettingMiddleware } from "../services/api";
import { SettingName, SettingType } from "../types";

const useKeywordCostHooks = () => {
  const keywordCost = useString("");
  const loading = useBoolean(false);

  const updateKeywordCost = (newCost: number) => {
    loading.setValue(true);
    updateSettingMiddleware(
      "mint keyword cost",
      SettingType.MINT_PRICE,
      SettingName.KEYWORD,
      { value: newCost },
      (status, value) => {
        if (status === STATUS_RESPONSE_CODE.SUCCESS && value) {
          keywordCost.setValue(value);
        }
        loading.setValue(false);
      }
    );
  };

  React.useEffect(() => {
    loading.setValue(true);

    getSettingMiddleware(
      SettingType.MINT_PRICE,
      SettingName.KEYWORD,
      (status, value) => {
        if (status === STATUS_RESPONSE_CODE.SUCCESS && value) {
          keywordCost.setValue(value);
        }
        loading.setValue(false);
      }
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return { isLoading: loading.value, keywordCost, updateKeywordCost };
};

export default useKeywordCostHooks;
