/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { FormSetCostStarDetailProps } from "../types";
import { ReactComponent as IconSetCost } from "assets/images/icons/set-cost.svg";
import { useBoolean, useString } from "helpers/hooks";
import IconEdit from "assets/images/icons/edit-fee.svg";
import IconSave from "assets/images/icons/save-fee.svg";
import IconCancel from "assets/images/icons/cancel-fee.svg";
import { showNotification, web3Instance } from "helpers/util";
import { CURRENCY_SYMBOL_WEB } from "config/environments";
import { STATUS_RESPONSE_CODE } from "types";
import BackdropCustomize from "components/BackdropCustomize";
import CustomCurrencyInput from "components/Input/CustomCurrencyInput";
import { setMintPriceStarMiddleware } from "../services/api";

const FormSetCostStarDetail = (
  props: FormSetCostStarDetailProps
): JSX.Element => {
  const { rootClass, purchasePrice, id, updateStarDetailWhenSetCost } = props;
  const updateFee = useBoolean();
  const valueInput = useString();
  const isLoading = useBoolean();
  const defaultMintCost = useString();

  useEffect(() => {
    valueInput.setValue(
      purchasePrice
        ? web3Instance.utils.fromWei(purchasePrice.toString())
        : defaultMintCost.value
    );
  }, [purchasePrice, defaultMintCost.value]);

  const handleOpenForm = (value: boolean) => async () => {
    updateFee.setValue(value);
    valueInput.setValue(
      purchasePrice
        ? web3Instance.utils.fromWei(purchasePrice.toString())
        : defaultMintCost.value
    );
  };

  const handleChangeInput = (newValue: string | undefined) => {
    valueInput.setValue(newValue ?? "");
  };

  const onSave = async () => {
    if (!valueInput.value) {
      showNotification(
        "error",
        `Mint cost must be greater than 0 ${CURRENCY_SYMBOL_WEB}`
      );
      return;
    }
    isLoading.setValue(true);
    // await sendSetCustomCostsStarTransaction(
    //   [uuidMintStar],
    //   [web3Instance.utils.toWei(String(valueInput.value))],
    //   oldAccount,
    //   (status: STATUS_RESPONSE_CODE) => {
    //     isLoading.setValue(false);
    //     if (status === STATUS_RESPONSE_CODE.SUCCESS) {
    //       updateStarDetailWhenSetCost(
    //         web3Instance.utils.toWei(String(valueInput.value))
    //       );
    //       updateFee.setValue(false);
    //     }
    //   }
    // );
    setMintPriceStarMiddleware(
      [
        {
          id,
          price: +valueInput.value,
        },
      ],
      (status) => {
        isLoading.setValue(false);
        if (status === STATUS_RESPONSE_CODE.SUCCESS) {
          updateStarDetailWhenSetCost(
            web3Instance.utils.toWei(valueInput.value)
          );
        }
      }
    );
  };

  return (
    <div className={`flex flex-col w-250-custom ${rootClass ?? "mt-8"}`}>
      <div className="flex flex-col p-4 card-info-star relative">
        <div className="flex items-center">
          <div className="w-35-custom h-35-custom rounded-full bg-orange-02-custom flex items-center justify-center">
            <IconSetCost className="icon-market w-20-custom h-20-custom" />
          </div>
          <p className="text-orange-custom font-medium text-xs ml-3">
            SET PRICE NFT ({CURRENCY_SYMBOL_WEB})
          </p>
        </div>

        <div className="flex items-center h-full card-donation-fee custom-disable-input-set-cost mt-4">
          {updateFee.value ? (
            <CustomCurrencyInput
              autoFocusInput
              value={valueInput.value}
              onValueChange={handleChangeInput}
            />
          ) : (
            <div className="h-8 border-b flex items-center">
              <p className="text-black font-semibold text-sm text-black-04-custom">
                {valueInput.value}
              </p>
            </div>
          )}
          <div className="flex justify-end ">
            {updateFee.value ? (
              <React.Fragment>
                <img
                  src={IconSave}
                  alt="icon"
                  className="cursor-pointer mr-2"
                  onClick={onSave}
                />
                <img
                  src={IconCancel}
                  onClick={handleOpenForm(false)}
                  alt="icon"
                  className="cursor-pointer"
                />
              </React.Fragment>
            ) : (
              <img
                src={IconEdit}
                onClick={handleOpenForm(true)}
                alt="icon"
                className="cursor-pointer"
              />
            )}
          </div>
        </div>
      </div>
      {isLoading.value ? <BackdropCustomize /> : null}
    </div>
  );
};
export default FormSetCostStarDetail;
