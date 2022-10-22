/* eslint-disable @typescript-eslint/no-explicit-any */
import abi from "./haisao.abi.json";
import { showNotification, web3Instance } from "./util";
import {
  BLOCK_EXPLORE_URL,
  CHAIN_ID,
  CHAIN_NAME,
  CURRENCY_DECIMALS,
  CURRENCY_NAME,
  CURRENCY_SYMBOL,
  KEYWORD_CONTRACT_ADDRESS,
  MARKET_CONTRACT_ADDRESS,
  RPC_URL,
  STAR_CONTRACT_ADDRESS,
  TOKEN_CONTRACT_ADDRESS,
} from "config/environments";
import { STATUS_RESPONSE_CODE, STATUS_RESPONSE_SMART_CONTRACT } from "types";
import stateStore from "slices/store";
import { setAccountWeb3 } from "slices/authSlice";
import { isFunction } from "lodash";
// eslint-disable-next-line
export const getStarContract = () => {
  const starContract = new web3Instance.eth.Contract(
    abi.star_contract,
    STAR_CONTRACT_ADDRESS
  );
  return starContract;
};
// eslint-disable-next-line
export const getKeywordContract = () => {
  const starContract = new web3Instance.eth.Contract(
    abi.keyword_contract,
    KEYWORD_CONTRACT_ADDRESS
  );
  return starContract;
};
// eslint-disable-next-line
export const getMarketContract = () => {
  const marketContract = new web3Instance.eth.Contract(
    abi.marketplace_contract,
    MARKET_CONTRACT_ADDRESS
  );
  return marketContract;
};
// eslint-disable-next-line
export const getERC20Contract = () => {
  const erc20Contract = new web3Instance.eth.Contract(
    abi.erc20_contract,
    TOKEN_CONTRACT_ADDRESS
  );
  return erc20Contract;
};
// eslint-disable-next-line
export const getTokenBalance = async (address) =>
  new Promise((resolve) => {
    const erc20Contract = getERC20Contract();
    erc20Contract.methods.balanceOf(address).call((err, data) => {
      if (err) {
        return resolve(BigInt(0));
      }
      resolve(BigInt(data));
    });
  });
// eslint-disable-next-line
export const getMintPrice = async (itemContract, itemId) =>
  new Promise((resolve) => {
    itemContract.methods.getMintPrice(itemId).call((err, data) => {
      if (err) {
        resolve(BigInt(0));
        return;
      }
      resolve(BigInt(data));
    });
  });
// eslint-disable-next-line
export const getAllowance = async (ownerAddress, spenderAddress) =>
  new Promise((resolve) => {
    const erc20Contract = getERC20Contract();
    erc20Contract.methods
      .allowance(ownerAddress, spenderAddress)
      .call((err, data) => {
        if (err) {
          resolve(0);
          return;
        }
        resolve(Number(data));
      });
  });
// eslint-disable-next-line
export const increaseAllowance = async (
  spenderAddress,
  allowanceValue,
  oldAccount,
  callBack
) => {
  const contract = getERC20Contract();
  contract.methods
    .increaseAllowance(spenderAddress, String(allowanceValue))
    .send({
      from: oldAccount,
      to: TOKEN_CONTRACT_ADDRESS,
    })
    .then(() => {
      showNotification("success", "Increase allowance successfully!");
      callBack(STATUS_RESPONSE_CODE.SUCCESS);
    })
    .catch(() => {
      showNotification("error", "Increase allowance failed!");
      callBack(STATUS_RESPONSE_CODE.ERROR);
    });
};
// eslint-disable-next-line
export const getListingFree = async (itemContract) =>
  new Promise((resolve) => {
    itemContract.methods.listingFee().call((err, data) => {
      if (err) {
        resolve(0);
        return;
      }
      resolve(Number(data));
    });
  });
// eslint-disable-next-line
export const checkAccountMetaMask = async (oldAccount) => {
  const dataConnect = await connectWallet();
  if (
    dataConnect.statusCode !==
    STATUS_RESPONSE_SMART_CONTRACT.ENABLE_METAMASK_SUCCESS
  ) {
    return;
  }
  let newAccount = oldAccount;
  if (!newAccount) {
    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      newAccount = accounts[0];
      stateStore.dispatch(
        setAccountWeb3({
          account: newAccount,
        })
      );
    } catch (error) {
      showNotification(
        "error",
        `No "from" address specified in neither the given options, nor the default options.`
      );
      return "";
    }
  }
  return newAccount;
};
// eslint-disable-next-line
export const connectWallet = async () => {
  if (!window.ethereum || !isFunction(window.ethereum.enable)) {
    showNotification("error", "You must install Metamask into your browser!");
    return {
      statusCode: STATUS_RESPONSE_SMART_CONTRACT.ENABLE_METAMASK_ERROR,
      message: "You must install Metamask into your browser!",
    };
  }
  try {
    await window.ethereum.enable();
    const chainID = parseInt(window.ethereum.chainId, 16);
    if (isNaN(chainID) || chainID === 0) {
      showNotification("error", "Can not detect chainID!");
      return {
        statusCode: STATUS_RESPONSE_SMART_CONTRACT.DETECT_CHAIN_ID,
        message: "Can not detect chainID!",
      };
    }
    try {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: String(CHAIN_ID) }],
      });
      return {
        statusCode: STATUS_RESPONSE_SMART_CONTRACT.ENABLE_METAMASK_SUCCESS,
        message: "",
      };
    } catch (switchError) {
      if (switchError.code === 4902) {
        try {
          await window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [
              {
                chainId: String(CHAIN_ID),
                chainName: String(CHAIN_NAME),
                blockExplorerUrls: [`${BLOCK_EXPLORE_URL}`],
                rpcUrls: [`${RPC_URL}`],
                nativeCurrency: {
                  name: String(CURRENCY_NAME),
                  symbol: String(CURRENCY_SYMBOL),
                  decimals: Number(CURRENCY_DECIMALS),
                },
              },
            ],
          });
          return {
            statusCode: STATUS_RESPONSE_SMART_CONTRACT.ENABLE_METAMASK_SUCCESS,
            message: "",
          };
        } catch (addError) {
          showNotification("error", `User unlinked ${CHAIN_NAME}`);
          return {
            statusCode:
              STATUS_RESPONSE_SMART_CONTRACT.CONNECT_BNB_SMART_CHAIN_TESTNET_ERROR,
            message: `User unlinked ${CHAIN_NAME}`,
          };
        }
      } else {
        showNotification("error", `User unlinked ${CHAIN_NAME}`);
        return {
          statusCode:
            STATUS_RESPONSE_SMART_CONTRACT.CONNECT_BNB_SMART_CHAIN_TESTNET_ERROR,
          message: `User unlinked ${CHAIN_NAME}`,
        };
      }
    }
  } catch (err) {
    showNotification(
      "error",
      "Your wallet is locked, please unlock your Metamask wallet first!"
    );
    return {
      statusCode: STATUS_RESPONSE_SMART_CONTRACT.UNLOCK_METAMASK,
      message:
        "Your wallet is locked, please unlock your Metamask wallet first!",
    };
  }
};
// eslint-disable-next-line
export const subscribingWallet = async () => {
  if (!window.ethereum) {
    return;
  }
  // window.ethereum.on("chainChanged", () => {
  //   window.location.reload();
  // });
  window.ethereum.on("accountsChanged", (accounts) => {
    stateStore.dispatch(
      setAccountWeb3({
        account: accounts.length ? accounts[0] : "",
      })
    );
  });
  // window.ethereum.on("disconnect", (error) => {
  //   console.log("disconnect", error);
  // });
  // window.ethereum.on("connect", ({ chainId }) => {
  //   console.log("on-connect", chainId);
  // });
};
export const convertDonationFee = (fee) => {
  return (fee / 100) * 10000;
};
