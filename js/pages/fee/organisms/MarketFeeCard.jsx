import React from "react";
import InputDefault from "components/Input/InputDefault";
import Typography from "components/Typography";
import IconEditFee from "assets/images/icons/edit-fee.svg";
import IconSaveFee from "assets/images/icons/save-fee.svg";
import IconCancelFee from "assets/images/icons/cancel-fee.svg";
import { CURRENCY_SYMBOL_WEB } from "config/environments";
import CustomCurrencyInput from "components/Input/CustomCurrencyInput";
import { formatValue } from "react-currency-input-field";
import { onRedirectTestnet } from "helpers/util";
const MarketFeeCard = (props) => {
    const { feeDetail, updateFee, valueInputFee, valueInputListing, updateFeeListing, handleOpenFormEditFee, handleChangeInput, updateDonationFee, updateListingFee, handleChangeInputListing, minFee, maxFee, } = props;
    const onValueChangeListing = (newValue) => {
        if (handleChangeInputListing) {
            handleChangeInputListing(newValue);
        }
    };
    return (<div className="flex flex-col mt-71-custom">
      <Typography variant="h3" textColor="text-black" fontWeight="font-semibold">
        Market
      </Typography>
      <div className="mt-3">
        <div className="h-70-custom flex pl-8 pr-8 card-fee-item-header">
          <div className="w-220-custom flex items-center h-full">
            <Typography variant="h5" textColor="text-black" fontWeight="font-semibold">
              Contract Balance
            </Typography>
          </div>

          <div className="w-400-custom flex items-center h-full">
            <Typography variant="h5" textColor="text-black" fontWeight="font-semibold">
              Donation Wallet
            </Typography>
          </div>
          <div className="flex items-center h-full">
            <div className="w-2/4 pr-4">
              <Typography variant="h5" textColor="text-black" fontWeight="font-semibold">
                Donation Fee (%)
              </Typography>
            </div>

            <Typography variant="h5" textColor="text-black" fontWeight="font-semibold">
              Listing Fee ({CURRENCY_SYMBOL_WEB})
            </Typography>
          </div>
        </div>
        <div className="h-70-custom pl-8 pr-8 flex card-fee-item-body">
          <div className="flex items-center h-full">
            <Typography textColor="text-black-04-custom" fontWeight="font-medium">
              {`${formatValue({
            value: String(feeDetail.donationBalance),
        })} ${CURRENCY_SYMBOL_WEB}`}
            </Typography>
          </div>

          <div className="flex items-center h-full">
            <Typography textColor="text-primary-custom" fontWeight="font-medium" textClass="work-break-custom cursor-pointer hover:underline" onClick={onRedirectTestnet(feeDetail.donationWaller)}>
              {`${feeDetail.donationWaller}`}
            </Typography>
          </div>
          <div className="flex items-center">
            <div className="flex items-center h-full card-donation-fee custom-disable-input-fee w-2/4 pr-4">
              <InputDefault type="number" disabled={!updateFee} min={minFee} max={maxFee} step={1} value={valueInputFee} onChange={handleChangeInput("market")}/>
              <div className="flex justify-end">
                {updateFee ? (<React.Fragment>
                    <img src={IconSaveFee} alt="icon" className="cursor-pointer mr-2" onClick={updateDonationFee}/>
                    <img src={IconCancelFee} onClick={handleOpenFormEditFee("market", false)} alt="icon" className="cursor-pointer"/>
                  </React.Fragment>) : (<img src={IconEditFee} onClick={handleOpenFormEditFee("market", true)} alt="icon" className="cursor-pointer"/>)}
              </div>
            </div>
            <div className="flex items-center h-full card-donation-fee custom-disable-input-fee w-2/4">
              <CustomCurrencyInput disabled={!updateFeeListing} value={valueInputListing ?? ""} onValueChange={onValueChangeListing}/>

              <div className="flex justify-end">
                {updateFeeListing ? (<React.Fragment>
                    <img src={IconSaveFee} alt="icon" className="cursor-pointer mr-2" onClick={updateListingFee && updateListingFee}/>
                    <img src={IconCancelFee} onClick={handleOpenFormEditFee("listing", false)} alt="icon" className="cursor-pointer"/>
                  </React.Fragment>) : (<img src={IconEditFee} onClick={handleOpenFormEditFee("listing", true)} alt="icon" className="cursor-pointer"/>)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>);
};
export default MarketFeeCard;
