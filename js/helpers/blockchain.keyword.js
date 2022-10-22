/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { KEYWORD_CONTRACT_ADDRESS } from "config/environments";
import { STATUS_RESPONSE_CODE } from "types";
import { checkAccountMetaMask, convertDonationFee, getKeywordContract, } from "./blockchain";
import { showNotification } from "./util";
// eslint-disable-next-line
export const sendMintKeywordTransaction = async (keywordId, newAccount, callBack) => {
    const contract = getKeywordContract();
    contract.methods
        .mint(keywordId)
        .send({
        from: newAccount,
        to: KEYWORD_CONTRACT_ADDRESS,
    })
        .then((receipt) => {
        showNotification("success", "Mint keyword successfully!");
        callBack(STATUS_RESPONSE_CODE.SUCCESS);
    })
        .catch((error) => {
        showNotification("error", "Mint keyword failed!");
        callBack(STATUS_RESPONSE_CODE.ERROR);
    });
};
// eslint-disable-next-line
export const sendMultipleMintKeywordTransaction = async (keywordIds, newAccount, callBack) => {
    const contract = getKeywordContract();
    contract.methods
        .multipleMint(keywordIds)
        .send({
        from: newAccount,
        to: KEYWORD_CONTRACT_ADDRESS,
    })
        .then((receipt) => {
        showNotification("success", "Multiple Mint keyword successfully!");
        callBack(STATUS_RESPONSE_CODE.SUCCESS);
    })
        .catch((error) => {
        showNotification("error", "Multiple Mint keyword failed!");
        callBack(STATUS_RESPONSE_CODE.ERROR);
    });
};
// eslint-disable-next-line
export const sendSetCustomCostsKeywordTransaction = async (metadataLists, priceLists, oldAccount, callBack) => {
    const newAccount = await checkAccountMetaMask(oldAccount);
    if (!newAccount) {
        callBack(STATUS_RESPONSE_CODE.ERROR);
        return;
    }
    const contract = getKeywordContract();
    contract.methods
        .setCustomMintPrices(metadataLists, priceLists)
        .send({
        from: newAccount,
        to: KEYWORD_CONTRACT_ADDRESS,
    })
        .then(() => {
        showNotification("success", "Set Price Keyword Successfully!");
        callBack(STATUS_RESPONSE_CODE.SUCCESS);
    })
        .catch((err) => {
        showNotification("error", err.message ?? "Set Price Keyword failed!");
        callBack(STATUS_RESPONSE_CODE.ERROR);
    });
};
// eslint-disable-next-line
export const getKeywordDonationBallance = async () => new Promise((resolve) => {
    const contract = getKeywordContract();
    contract.methods.donationBalance().call((err, data) => {
        if (err) {
            return resolve(BigInt(0));
        }
        resolve(BigInt(data));
    });
});
// eslint-disable-next-line
export const getKeywordDonationFee = async () => new Promise((resolve) => {
    const contract = getKeywordContract();
    contract.methods.donationFee().call((err, data) => {
        if (err) {
            return resolve(0);
        }
        resolve(Number(data));
    });
});
// eslint-disable-next-line
export const getKeywordDonationWaller = async () => new Promise((resolve) => {
    const contract = getKeywordContract();
    contract.methods.donationWallet().call((err, data) => {
        if (err) {
            return resolve("");
        }
        resolve(String(data));
    });
});
// eslint-disable-next-line
export const sendSetKeywordDonationFeeTransaction = async (newDonationFee, oldAccount, callBack) => {
    const newAccount = await checkAccountMetaMask(oldAccount);
    if (!newAccount) {
        return;
    }
    const contract = getKeywordContract();
    contract.methods
        .setDonationFee(convertDonationFee(newDonationFee))
        .send({
        from: newAccount,
        to: KEYWORD_CONTRACT_ADDRESS,
    })
        .then(() => {
        showNotification("success", "Set Donation Fee Keyword Successfully!");
        callBack(STATUS_RESPONSE_CODE.SUCCESS);
    })
        .catch((err) => {
        showNotification("error", err.message ?? "Set Donation Fee Keyword failed!");
        callBack(STATUS_RESPONSE_CODE.ERROR);
    });
};
// eslint-disable-next-line
export const sendSetCostKeywordTransaction = async (newMintPrice, oldAccount, callBack) => {
    const newAccount = await checkAccountMetaMask(oldAccount);
    if (!newAccount) {
        return;
    }
    const contract = getKeywordContract();
    contract.methods
        .setMintPrice(newMintPrice)
        .send({
        from: newAccount,
        to: KEYWORD_CONTRACT_ADDRESS,
    })
        .then(() => {
        showNotification("success", "Set mint Keyword NFT cost successfully!");
        callBack(STATUS_RESPONSE_CODE.SUCCESS);
    })
        .catch((err) => {
        showNotification("error", err.message ?? "Set mint Keyword NFT cost failed!");
        callBack(STATUS_RESPONSE_CODE.ERROR);
    });
};
