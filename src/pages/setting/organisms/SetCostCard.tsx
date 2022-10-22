/* eslint-disable react-hooks/exhaustive-deps */
import BackdropCustomize from "components/BackdropCustomize";
import { CURRENCY_SYMBOL_WEB } from "config/environments";
import { useBoolean } from "helpers/hooks";
import useKeywordCostHooks from "../hooks/useKeywordCostHooks";
import useMaxExpiryDateHooks from "../hooks/useMaxExpiryDateHooks";
import useMaxPriceHooks from "../hooks/useMaxPriceHooks";
import useMinPriceHooks from "../hooks/useMinPriceHooks";
import useRegisterNameFeeHooks from "../hooks/useRegisterNameFeeHooks";
import useStarCostHooks from "../hooks/useStarCostHooks";
import CostCard from "./CostCard";

const SetCostCard = (): JSX.Element => {
  const isLoading = useBoolean(false);
  const {
    isLoading: isLoadingStar,
    starCost,
    updateStarCost,
  } = useStarCostHooks();
  const {
    isLoading: isLoadingKeyword,
    keywordCost,
    updateKeywordCost,
  } = useKeywordCostHooks();
  const {
    isLoading: isLoadingRegisterNameFee,
    registerNameFee,
    updateRegisterNameFee,
  } = useRegisterNameFeeHooks();

  // const {
  //   isLoading: isLoadingMinPrice,
  //   minPrice,
  //   updateMinPrice,
  // } = useMinPriceHooks();

  // const {
  //   isLoading: isLoadingMaxPrice,
  //   maxPrice,
  //   updateMaxPrice,
  // } = useMaxPriceHooks();

  // const {
  //   isLoading: isLoadingMaxExpiryDate,
  //   maxExpiryDate,
  //   updateMaxExpiryDate,
  // } = useMaxExpiryDateHooks();

  const isLoadingPage =
    isLoading.value ||
    isLoadingStar ||
    isLoadingKeyword ||
    isLoadingRegisterNameFee;
  // isLoadingMinPrice ||
  // isLoadingMaxPrice ||
  // isLoadingMaxExpiryDate;

  return (
    <div
      className="container-card"
      style={{ gridTemplateColumns: "repeat(auto-fit, minmax(420px, 1fr))" }}
    >
      <CostCard
        classes="reward-card mr-8"
        label={`Set mint Star NFT cost* (${CURRENCY_SYMBOL_WEB})`}
        onSubmit={updateStarCost}
        defaultValue={starCost.value}
      />
      <CostCard
        classes="reward-card mr-8"
        label={`Set mint Keyword NFT cost* (${CURRENCY_SYMBOL_WEB})`}
        onSubmit={updateKeywordCost}
        defaultValue={keywordCost.value}
      />
      <CostCard
        classes="reward-card"
        label={`Set Register Name Fee* (${CURRENCY_SYMBOL_WEB})`}
        onSubmit={updateRegisterNameFee}
        defaultValue={registerNameFee.value}
      />
      {/* <CostCard
        classes="reward-card"
        label={`Set min price* (${CURRENCY_SYMBOL_WEB})`}
        onSubmit={updateMinPrice}
        defaultValue={minPrice.value}
      />
      <CostCard
        classes="reward-card"
        label={`Set max price* (${CURRENCY_SYMBOL_WEB})`}
        onSubmit={updateMaxPrice}
        defaultValue={maxPrice.value}
      />
      <CostCard
        classes="reward-card"
        label={`Set max expiry date* (day)`}
        onSubmit={updateMaxExpiryDate}
        defaultValue={maxExpiryDate.value}
        usingInputNumber
      /> */}
      {isLoadingPage ? <BackdropCustomize /> : null}
    </div>
  );
};

export default SetCostCard;
