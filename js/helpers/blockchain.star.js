/* eslint-disable @typescript-eslint/no-explicit-any */
import { STAR_CONTRACT_ADDRESS } from "config/environments";
import { STATUS_RESPONSE_CODE } from "types";
import { checkAccountMetaMask, convertDonationFee, getStarContract, } from "./blockchain";
import { showNotification } from "./util";
// eslint-disable-next-line
export const getStarDonationBallance = async () => new Promise((resolve) => {
    const contract = getStarContract();
    contract.methods.donationBalance().call((err, data) => {
        if (err) {
            return resolve(BigInt(0));
        }
        resolve(BigInt(data));
    });
});
// eslint-disable-next-line
export const getStarDonationFee = async () => new Promise((resolve) => {
    const contract = getStarContract();
    contract.methods.donationFee().call((err, data) => {
        if (err) {
            return resolve(0);
        }
        resolve(Number(data));
    });
});
// eslint-disable-next-line
export const getStarDonationWaller = async () => new Promise((resolve) => {
    const contract = getStarContract();
    contract.methods.donationWallet().call((err, data) => {
        if (err) {
            return resolve("");
        }
        resolve(String(data));
    });
});
// eslint-disable-next-line
export const sendSetStarDonationFeeTransaction = async (newDonationFee, oldAccount, callBack) => {
    const newAccount = await checkAccountMetaMask(oldAccount);
    if (!newAccount) {
        return;
    }
    const contract = getStarContract();
    contract.methods
        .setDonationFee(convertDonationFee(newDonationFee))
        .send({
        from: newAccount,
        to: STAR_CONTRACT_ADDRESS,
    })
        .then(() => {
        showNotification("success", "Set Donation Fee Star Successfully!");
        callBack(STATUS_RESPONSE_CODE.SUCCESS);
    })
        .catch((err) => {
        showNotification("error", err.message ?? "Set Donation Fee Star failed!");
        callBack(STATUS_RESPONSE_CODE.ERROR);
    });
};
// eslint-disable-next-line
export const sendSetCostStarTransaction = async (newMintPrice, oldAccount, callBack) => {
    const newAccount = await checkAccountMetaMask(oldAccount);
    if (!newAccount) {
        return;
    }
    const contract = getStarContract();
    contract.methods
        .setMintPrice(newMintPrice)
        .send({
        from: newAccount,
        to: STAR_CONTRACT_ADDRESS,
    })
        .then(() => {
        showNotification("success", "Set mint Star NFT cost successfully!");
        callBack(STATUS_RESPONSE_CODE.SUCCESS);
    })
        .catch((err) => {
        showNotification("error", err.message ?? "Set mint Star NFT cost failed!");
        callBack(STATUS_RESPONSE_CODE.ERROR);
    });
};
// eslint-disable-next-line
export const sendSetCustomCostsStarTransaction = async (metadataLists, priceLists, oldAccount, callBack) => {
    const newAccount = await checkAccountMetaMask(oldAccount);
    if (!newAccount) {
        callBack(STATUS_RESPONSE_CODE.ERROR);
        return;
    }
    const contract = getStarContract();
    contract.methods
        .setCustomMintPrices(metadataLists, priceLists)
        .send({
        from: newAccount,
        to: STAR_CONTRACT_ADDRESS,
    })
        .then(() => {
        showNotification("success", "Set Price Star Successfully!");
        callBack(STATUS_RESPONSE_CODE.SUCCESS);
    })
        .catch((err) => {
        showNotification("error", err.message ?? "Set Price Star failed!");
        callBack(STATUS_RESPONSE_CODE.ERROR);
    });
};
