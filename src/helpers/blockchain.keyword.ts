/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { KEYWORD_CONTRACT_ADDRESS } from "config/environments";
import { STATUS_RESPONSE_CODE } from "types";
import {
  checkAccountMetaMask,
  convertDonationFee,
  getKeywordContract,
} from "./blockchain";
import { showNotification } from "./util";

// eslint-disable-next-line
export const sendMintKeywordTransaction = async (
  keywordId: string,
  newAccount: string,
  callBack: (status: STATUS_RESPONSE_CODE) => void
) => {
  const contract = getKeywordContract();

  contract.methods
    .mint(keywordId)
    .send({
      from: newAccount, // get account from persistance state
      to: KEYWORD_CONTRACT_ADDRESS,
    })
    .then((receipt: any) => {
      showNotification("success", "Mint keyword successfully!");
      callBack(STATUS_RESPONSE_CODE.SUCCESS);
    })
    .catch((error: any) => {
      showNotification("error", "Mint keyword failed!");
      callBack(STATUS_RESPONSE_CODE.ERROR);
    });
};

// eslint-disable-next-line
export const sendMultipleMintKeywordTransaction = async (
  keywordIds: string[],
  newAccount: string,
  callBack: (status: STATUS_RESPONSE_CODE) => void
) => {
  const contract = getKeywordContract();
  contract.methods
    .multipleMint(keywordIds)
    .send({
      from: newAccount, // get account from persistance state
      to: KEYWORD_CONTRACT_ADDRESS,
    })
    .then((receipt: any) => {
      showNotification("success", "Multiple Mint keyword successfully!");
      callBack(STATUS_RESPONSE_CODE.SUCCESS);
    })
    .catch((error: any) => {
      showNotification("error", "Multiple Mint keyword failed!");
      callBack(STATUS_RESPONSE_CODE.ERROR);
    });
};

// eslint-disable-next-line
export const sendSetCustomCostsKeywordTransaction = async (
  metadataLists: string[],
  priceLists: string[],
  oldAccount: string,
  callBack: (status: STATUS_RESPONSE_CODE) => void
) => {
  const newAccount = await checkAccountMetaMask(oldAccount);
  if (!newAccount) {
    callBack(STATUS_RESPONSE_CODE.ERROR);
    return;
  }
  const contract = getKeywordContract();
  contract.methods
    .setCustomMintPrices(metadataLists, priceLists)
    .send({
      from: newAccount, // get account from persistance state
      to: KEYWORD_CONTRACT_ADDRESS,
    })
    .then(() => {
      showNotification("success", "Set Price Keyword Successfully!");
      callBack(STATUS_RESPONSE_CODE.SUCCESS);
    })
    .catch((err: any) => {
      showNotification("error", err.message ?? "Set Price Keyword failed!");
      callBack(STATUS_RESPONSE_CODE.ERROR);
    });
};

// eslint-disable-next-line
export const getKeywordDonationBallance = async () =>
  new Promise<BigInt>((resolve) => {
    const contract = getKeywordContract();
    contract.methods.donationBalance().call((err: Error, data: any) => {
      if (err) {
        return resolve(BigInt(0));
      }
      resolve(BigInt(data));
    });
  });

// eslint-disable-next-line
export const getKeywordDonationFee = async () =>
  new Promise<number>((resolve) => {
    const contract = getKeywordContract();
    contract.methods.donationFee().call((err: Error, data: any) => {
      if (err) {
        return resolve(0);
      }
      resolve(Number(data));
    });
  });
// eslint-disable-next-line
export const getKeywordDonationWaller = async () =>
  new Promise<string>((resolve) => {
    const contract = getKeywordContract();
    contract.methods.donationWallet().call((err: Error, data: any) => {
      if (err) {
        return resolve("");
      }
      resolve(String(data));
    });
  });

// eslint-disable-next-line
export const sendSetKeywordDonationFeeTransaction = async (
  newDonationFee: number,
  oldAccount: string,
  callBack: (status: STATUS_RESPONSE_CODE) => void
) => {
  const newAccount = await checkAccountMetaMask(oldAccount);
  if (!newAccount) {
    return;
  }
  const contract = getKeywordContract();
  contract.methods
    .setDonationFee(convertDonationFee(newDonationFee))
    .send({
      from: newAccount, // get account from persistance state
      to: KEYWORD_CONTRACT_ADDRESS,
    })
    .then(() => {
      showNotification("success", "Set Donation Fee Keyword Successfully!");
      callBack(STATUS_RESPONSE_CODE.SUCCESS);
    })
    .catch((err: any) => {
      showNotification(
        "error",
        err.message ?? "Set Donation Fee Keyword failed!"
      );
      callBack(STATUS_RESPONSE_CODE.ERROR);
    });
};

// eslint-disable-next-line
export const sendSetCostKeywordTransaction = async (
  newMintPrice: string,
  oldAccount: string,
  callBack: (status: STATUS_RESPONSE_CODE) => void
) => {
  const newAccount = await checkAccountMetaMask(oldAccount);
  if (!newAccount) {
    return;
  }
  const contract = getKeywordContract();
  contract.methods
    .setMintPrice(newMintPrice)
    .send({
      from: newAccount, // get account from persistance state
      to: KEYWORD_CONTRACT_ADDRESS,
    })
    .then(() => {
      showNotification("success", "Set mint Keyword NFT cost successfully!");
      callBack(STATUS_RESPONSE_CODE.SUCCESS);
    })
    .catch((err: any) => {
      showNotification(
        "error",
        err.message ?? "Set mint Keyword NFT cost failed!"
      );
      callBack(STATUS_RESPONSE_CODE.ERROR);
    });
};
