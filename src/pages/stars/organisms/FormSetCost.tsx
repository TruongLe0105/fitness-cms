/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import BackdropCustomize from "components/BackdropCustomize";
import ButtonDefault from "components/Button/ButtonDefault";
import { useBoolean } from "helpers/hooks";
import Popup from "reactjs-popup";
import { FormSetCostProps, SetMintPriceBody } from "../types";
import IconClose from "assets/images/icons/close.svg";
import Typography from "components/Typography";
import { useEffect, useState } from "react";
import { web3Instance } from "helpers/util";
import { STATUS_RESPONSE_CODE } from "types";
import CustomCurrencyInput from "components/Input/CustomCurrencyInput";
import { reduce } from "lodash";
import { setMintPriceStarMiddleware } from "../services/api";

const FormSetCost = (props: FormSetCostProps): JSX.Element => {
  const { dataItem, openForm, onClose, updateList } = props;
  const [fromDataSetCost, setFromDataSetCost] = useState<any>(null);
  const [originFromDataSetCost, setOriginFromDataSetCost] = useState<any>(null);

  useEffect(() => {
    const newObj = {};
    dataItem.stars.forEach((star) => {
      newObj[star.id] = star.purchasePrice
        ? web3Instance.utils.fromWei(star.purchasePrice?.toString())
        : String(dataItem.defaultMintCost);
    });

    setFromDataSetCost(newObj);
    setOriginFromDataSetCost(newObj);
  }, [JSON.stringify(dataItem.stars)]);

  const isLoading = useBoolean();

  const onSubmitButton = async () => {
    if (!fromDataSetCost) {
      return;
    }
    isLoading.setValue(true);
    // const newMetadata: string[] = [];
    // const newCost: string[] = [];
    const formDataReduce = compareFormDataSetCost();
    const body: SetMintPriceBody[] = Object.keys(formDataReduce).map((key) => ({
      id: key,
      price: +formDataReduce[key],
    }));
    setMintPriceStarMiddleware(body, (status) => {
      isLoading.setValue(false);
      if (status === STATUS_RESPONSE_CODE.SUCCESS) {
        updateList(body);
        onClose();
      }
    });
    // for (const [key, value] of Object.entries(formDataReduce)) {
    //   newMetadata.push(String(key));
    //   const formatCost = web3Instance.utils.toWei(String(value));
    //   newCost.push(formatCost);
    // }
    // await sendSetCustomCostsStarTransaction(
    //   newMetadata,
    //   newCost,
    //   oldAccount,
    //   (status: STATUS_RESPONSE_CODE) => {
    //     isLoading.setValue(false);
    //     if (status === STATUS_RESPONSE_CODE.SUCCESS) {
    //       updateList();
    //       onClose();
    //     }
    //   }
  };

  const handleChangeInput = (id: string, valueInput: string | undefined) => {
    setFromDataSetCost({
      ...fromDataSetCost,
      [id]: valueInput,
    });
  };

  const disabledButton = () => {
    if (!fromDataSetCost) {
      return true;
    }
    let isDisable = false;
    const formDataReduce = compareFormDataSetCost();
    if (!Object.keys(formDataReduce).length) {
      isDisable = true;
    }
    if (
      Object.values(formDataReduce).filter((item) => Number(item) > 0)
        .length !== Object.keys(formDataReduce).filter((item) => item).length
    ) {
      isDisable = true;
    }
    return isDisable;
  };

  const compareFormDataSetCost = () => {
    return reduce(
      fromDataSetCost,
      function (result, value, key) {
        if (originFromDataSetCost[key] !== value) {
          result[key] = value;
        }
        return result;
      },
      {}
    );
  };

  const headers = ["Name", "Set Price"];
  return (
    <Popup disabled className="dialog" open={openForm}>
      <div className="view-dialog-body">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center">
            <Typography
              variant="h3"
              fontWeight="font-bold"
              textColor="text-primary-custom"
            >
              Set Price
            </Typography>
          </div>

          <img
            src={IconClose}
            alt="icon"
            className="cursor-pointer"
            onClick={onClose}
          />
        </div>
        <div className="flex flex-col p-4 card-info-star">
          <div className="flex h-50-custom border-b border-gray-02-custom">
            {headers.map((header, ind) => (
              <div key={ind} className="w-300-custom px-4 flex items-center ">
                <Typography
                  variant="h6"
                  textColor="text-black"
                  fontWeight="font-semibold"
                >
                  {header}
                </Typography>
              </div>
            ))}
          </div>
          {dataItem.stars.length
            ? dataItem.stars.map((el, index) => (
                <div
                  key={index}
                  className={`flex h-50-custom ${
                    index < dataItem.stars.length - 1
                      ? "border-b border-gray-02-custom"
                      : ""
                  }`}
                >
                  <div className="w-300-custom px-4 flex items-center ">
                    <Typography
                      variant="h6"
                      textColor="text-black"
                      fontWeight="font-semibold"
                    >
                      {el.name}
                    </Typography>
                  </div>
                  <div className="w-300-custom px-4 flex items-center ">
                    <CustomCurrencyInput
                      value={fromDataSetCost ? fromDataSetCost[el.id] : ""}
                      onValueChange={(value) => handleChangeInput(el.id, value)}
                    />
                  </div>
                </div>
              ))
            : null}
        </div>
        <div className="flex items-center justify-between mt-8">
          <ButtonDefault
            widthButton="w-140-custom"
            onClick={onSubmitButton}
            disabled={disabledButton()}
          >
            Submit
          </ButtonDefault>
        </div>

        {isLoading.value ? <BackdropCustomize /> : null}
      </div>
    </Popup>
  );
};
export default FormSetCost;
