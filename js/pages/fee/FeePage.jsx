/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import BackdropCustomize from "components/BackdropCustomize";
import { checkAccountMetaMask, connectWallet, getTokenBalance, } from "helpers/blockchain";
import { getKeywordDonationBallance, getKeywordDonationFee, getKeywordDonationWaller, sendSetKeywordDonationFeeTransaction, } from "helpers/blockchain.keyword";
import { getMarketDonationBallance, getMarketDonationFee, getMarketDonationWaller, getMarketListingFee, sendSetMarketDonationFeeTransaction, sendSetMarketListingFeeTransaction, } from "helpers/blockchain.market";
import { getStarDonationBallance, getStarDonationFee, getStarDonationWaller, sendSetStarDonationFeeTransaction, } from "helpers/blockchain.star";
import { useBoolean, useString } from "helpers/hooks";
import { showNotification, web3Instance } from "helpers/util";
import PageLayout from "pages/layout/organisms/PageLayout";
import React, { useEffect, useState } from "react";
import { useAppSelector } from "slices/store";
import { emptyFeeDetail, emptyFormEditFee } from "./types";
import { STATUS_RESPONSE_CODE, STATUS_RESPONSE_SMART_CONTRACT } from "types";
import KeywordFeeCard from "./organisms/KeywordFeeCard";
import MarketFeeCard from "./organisms/MarketFeeCard";
import StarFeeCard from "./organisms/StarFeeCard";
import MetamaskCard from "components/Notification/MetamaskCard";
import { CURRENCY_SYMBOL_WEB } from "config/environments";
const fee = {
    min: 0.01,
    max: 120,
};
const FeePage = () => {
    const isLoading = useBoolean();
    const oldAccount = useAppSelector((state) => state.auth.accountWeb3.account ? state.auth.accountWeb3.account : "");
    const [starFee, setStarFee] = useState(emptyFeeDetail);
    const [keywordFee, setKeywordFee] = useState(emptyFeeDetail);
    const [marketFee, setMarketFee] = useState(emptyFeeDetail);
    const [updateFee, setUpdateFee] = useState(emptyFormEditFee);
    const [valueInputFee, setValueInputFee] = useState({
        star: 0,
        keyword: 0,
        market: 0,
        listing: "",
    });
    const messengerMetamask = useString("");
    useEffect(() => {
        isLoading.setValue(true);
        if (!oldAccount) {
            messengerMetamask.setValue(`Your wallet is locked, please unlock your Metamask wallet first!`);
            isLoading.setValue(false);
        }
        checkConnectWallet();
    }, [oldAccount]);
    const checkConnectWallet = async () => {
        const dataConnectMetamask = await connectWallet();
        if (dataConnectMetamask.statusCode ===
            STATUS_RESPONSE_SMART_CONTRACT.ENABLE_METAMASK_SUCCESS) {
            getFees();
            return;
        }
        messengerMetamask.setValue(dataConnectMetamask.message);
        isLoading.setValue(false);
    };
    const getFees = async () => {
        const newAccount = await checkAccountMetaMask(oldAccount);
        if (!newAccount) {
            messengerMetamask.setValue(`Your wallet is locked, please unlock your Metamask wallet first!`);
            return;
        }
        const calls = [];
        calls.push(getTokenBalance(newAccount));
        calls.push(getStarDonationBallance());
        calls.push(getStarDonationFee());
        calls.push(getStarDonationWaller());
        calls.push(getKeywordDonationBallance());
        calls.push(getKeywordDonationFee());
        calls.push(getKeywordDonationWaller());
        calls.push(getMarketDonationBallance());
        calls.push(getMarketDonationFee());
        calls.push(getMarketDonationWaller());
        calls.push(getMarketListingFee());
        const [balance, starDonationBalance, starDonationFee, starDonationWaller, keywordDonationBalance, keywordDonationFee, keywordDonationWaller, marketDonationBalance, marketDonationFee, marketDonationWaller, marketListingFeeMarket,] = await Promise.all(calls);
        setStarFee({
            donationBalance: Number(web3Instance.utils.fromWei(String(BigInt(balance) - BigInt(starDonationBalance)))),
            donationFee: Number(starDonationFee),
            donationWaller: String(starDonationWaller),
        });
        setKeywordFee({
            donationBalance: Number(web3Instance.utils.fromWei(String(BigInt(balance) - BigInt(keywordDonationBalance)))),
            donationFee: Number(keywordDonationFee),
            donationWaller: String(keywordDonationWaller),
        });
        setMarketFee({
            donationBalance: Number(web3Instance.utils.fromWei(String(BigInt(balance) - BigInt(marketDonationBalance)))),
            donationFee: Number(marketDonationFee),
            donationWaller: String(marketDonationWaller),
            listingFee: web3Instance.utils.fromWei(String(marketListingFeeMarket)),
        });
        setValueInputFee({
            star: Number(starDonationFee),
            keyword: Number(keywordDonationFee),
            market: Number(marketDonationFee),
            listing: web3Instance.utils.fromWei(String(marketListingFeeMarket)),
        });
        isLoading.setValue(false);
        messengerMetamask.setValue("");
    };
    const handleOpenFormEditFee = (key, value) => async () => {
        const dataConnectMetamask = await connectWallet();
        if (dataConnectMetamask.statusCode !==
            STATUS_RESPONSE_SMART_CONTRACT.ENABLE_METAMASK_SUCCESS) {
            return;
        }
        const newUpdateFee = {
            star: false,
            keyword: false,
            market: false,
            listing: false,
        };
        newUpdateFee[key] = value;
        setUpdateFee({
            ...newUpdateFee,
        });
        setValueInputFee({
            star: starFee.donationFee,
            keyword: keywordFee.donationFee,
            market: marketFee.donationFee,
            listing: marketFee.listingFee ?? "",
        });
    };
    const handleChangeInput = (key) => (event) => {
        if (key !== "listing") {
            const newValue = event.target.value
                ? parseFloat(parseFloat(event.target.value).toFixed(2))
                : "";
            if (Number(newValue) && Number(newValue) < fee.min) {
                setValueInputFee({
                    ...valueInputFee,
                    [key]: fee.min,
                });
                return;
            }
            setValueInputFee({
                ...valueInputFee,
                [key]: newValue > fee.max ? fee.max : newValue,
            });
        }
    };
    const handleChangeInputListing = (newValue) => {
        setValueInputFee({
            ...valueInputFee,
            listing: newValue ?? "",
        });
    };
    const updateDonationFeeStar = async () => {
        if (valueInputFee.star < fee.min || valueInputFee.star > fee.max) {
            showNotification("error", `Donation Fee Star must be between ${fee.min}% and ${fee.max}% !`);
            return;
        }
        isLoading.setValue(true);
        await sendSetStarDonationFeeTransaction(valueInputFee.star, oldAccount, async (status) => {
            isLoading.setValue(false);
            if (status === STATUS_RESPONSE_CODE.SUCCESS) {
                const newFee = await getStarDonationFee();
                setStarFee({
                    ...starFee,
                    donationFee: newFee,
                });
                setUpdateFee({
                    ...updateFee,
                    star: false,
                });
            }
        });
    };
    const updateDonationFeeKeyword = async () => {
        if (valueInputFee.keyword < fee.min || valueInputFee.keyword > fee.max) {
            showNotification("error", `Donation Fee Keyword must be between ${fee.min}% and ${fee.max}% !`);
            return;
        }
        isLoading.setValue(true);
        await sendSetKeywordDonationFeeTransaction(valueInputFee.keyword, oldAccount, async (status) => {
            isLoading.setValue(false);
            if (status === STATUS_RESPONSE_CODE.SUCCESS) {
                const newFee = await getKeywordDonationFee();
                setKeywordFee({
                    ...keywordFee,
                    donationFee: newFee,
                });
                setUpdateFee({
                    ...updateFee,
                    keyword: false,
                });
            }
        });
    };
    const updateDonationFeeMarket = async () => {
        if (valueInputFee.market < fee.min || valueInputFee.market > fee.max) {
            showNotification("error", `Donation Fee Market must be between ${fee.min}% and ${fee.max}% !`);
            return;
        }
        isLoading.setValue(true);
        await sendSetMarketDonationFeeTransaction(valueInputFee.market, oldAccount, async (status) => {
            isLoading.setValue(false);
            if (status === STATUS_RESPONSE_CODE.SUCCESS) {
                const newFee = await getMarketDonationFee();
                setMarketFee({
                    ...marketFee,
                    donationFee: newFee,
                });
                setUpdateFee({
                    ...updateFee,
                    market: false,
                });
            }
        });
    };
    const updateListingFee = async () => {
        if (!Number(valueInputFee.listing)) {
            showNotification("error", `Mint cost must be greater than 0 ${CURRENCY_SYMBOL_WEB}`);
            return;
        }
        isLoading.setValue(true);
        await sendSetMarketListingFeeTransaction(web3Instance.utils.toWei(String(valueInputFee.listing ? valueInputFee.listing : 0)), oldAccount, async (status) => {
            isLoading.setValue(false);
            if (status === STATUS_RESPONSE_CODE.SUCCESS) {
                const newFee = await getMarketListingFee();
                setMarketFee({
                    ...marketFee,
                    listingFee: web3Instance.utils.fromWei(String(newFee)),
                });
                setUpdateFee({
                    ...updateFee,
                    listing: false,
                });
            }
        });
    };
    return (<PageLayout title="Fee" childrenAction={<div className="flex items-center justify-end h-full pr-8"></div>}>
      {!messengerMetamask.value ? (<React.Fragment>
          <StarFeeCard feeDetail={starFee} updateFee={updateFee.star} valueInputFee={valueInputFee.star} handleChangeInput={handleChangeInput} handleOpenFormEditFee={handleOpenFormEditFee} updateDonationFee={updateDonationFeeStar} minFee={fee.min} maxFee={fee.max}/>
          <KeywordFeeCard feeDetail={keywordFee} updateFee={updateFee.keyword} valueInputFee={valueInputFee.keyword} handleChangeInput={handleChangeInput} handleOpenFormEditFee={handleOpenFormEditFee} updateDonationFee={updateDonationFeeKeyword} minFee={fee.min} maxFee={fee.max}/>
          <MarketFeeCard feeDetail={marketFee} updateFee={updateFee.market} valueInputFee={valueInputFee.market} handleChangeInput={handleChangeInput} handleOpenFormEditFee={handleOpenFormEditFee} updateDonationFee={updateDonationFeeMarket} valueInputListing={valueInputFee.listing} updateFeeListing={updateFee.listing} updateListingFee={updateListingFee} handleChangeInputListing={handleChangeInputListing} minFee={fee.min} maxFee={fee.max}/>
        </React.Fragment>) : (<MetamaskCard messenger={messengerMetamask.value}/>)}
      {isLoading.value ? <BackdropCustomize /> : null}
    </PageLayout>);
};
export default FeePage;
