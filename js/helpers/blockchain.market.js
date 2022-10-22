/* eslint-disable @typescript-eslint/no-explicit-any */
import { MARKET_CONTRACT_ADDRESS } from "config/environments";
import { STATUS_RESPONSE_CODE } from "types";
import { checkAccountMetaMask, convertDonationFee, getMarketContract, } from "./blockchain";
import { showNotification } from "./util";
// eslint-disable-next-line
export const getMarketDonationBallance = async () => new Promise((resolve) => {
    const contract = getMarketContract();
    contract.methods.donationBalance().call((err, data) => {
        if (err) {
            return resolve(BigInt(0));
        }
        resolve(BigInt(data));
    });
});
// eslint-disable-next-line
export const getMarketDonationFee = async () => new Promise((resolve) => {
    const contract = getMarketContract();
    contract.methods.donationFee().call((err, data) => {
        if (err) {
            return resolve(0);
        }
        resolve(Number(data));
    });
});
// eslint-disable-next-line
export const getMarketDonationWaller = async () => new Promise((resolve) => {
    const contract = getMarketContract();
    contract.methods.donationWallet().call((err, data) => {
        if (err) {
            return resolve("");
        }
        resolve(String(data));
    });
});
// eslint-disable-next-line
export const getMarketListingFee = async () => new Promise((resolve) => {
    const contract = getMarketContract();
    contract.methods.listingFee().call((err, data) => {
        if (err) {
            return resolve(0);
        }
        resolve(Number(data));
    });
});
// eslint-disable-next-line
export const sendSetMarketDonationFeeTransaction = async (newDonationFee, oldAccount, callBack) => {
    const newAccount = await checkAccountMetaMask(oldAccount);
    if (!newAccount) {
        return;
    }
    const contract = getMarketContract();
    contract.methods
        .setDonationFee(convertDonationFee(newDonationFee))
        .send({
        from: newAccount,
        to: MARKET_CONTRACT_ADDRESS,
    })
        .then(() => {
        showNotification("success", "Set Donation Fee Market Successfully!");
        callBack(STATUS_RESPONSE_CODE.SUCCESS);
    })
        .catch((err) => {
        showNotification("error", err.message ?? "Set Donation Fee Market failed!");
        callBack(STATUS_RESPONSE_CODE.ERROR);
    });
};
// eslint-disable-next-line
export const sendSetMarketListingFeeTransaction = async (newListingFee, oldAccount, callBack) => {
    const newAccount = await checkAccountMetaMask(oldAccount);
    if (!newAccount) {
        return;
    }
    const contract = getMarketContract();
    contract.methods
        .setListingFee(newListingFee)
        .send({
        from: newAccount,
        to: MARKET_CONTRACT_ADDRESS,
    })
        .then(() => {
        showNotification("success", "Set Listing Fee Market Successfully!");
        callBack(STATUS_RESPONSE_CODE.SUCCESS);
    })
        .catch((err) => {
        showNotification("error", err.message ?? "Set Listing Fee Market failed!");
        callBack(STATUS_RESPONSE_CODE.ERROR);
    });
};
