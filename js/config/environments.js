export const isLogin = () => {
    const accessToken = localStorage.getItem("access_token");
    // console.log(accessToken)
    if (!accessToken) {
        return false;
    }
    return true;
};
export const API_URL = process.env.REACT_APP_API_URL || "";
export const BSC_SCAN_URL = process.env.REACT_APP_BSC_SCAN_URL || "";
export const TOKEN_CONTRACT_ADDRESS = process.env.REACT_APP_TOKEN_CONTRACT_ADDRESS || "";
export const MARKET_CONTRACT_ADDRESS = process.env.REACT_APP_MARKET_CONTRACT_ADDRESS || "";
export const STAR_CONTRACT_ADDRESS = process.env.REACT_APP_STAR_CONTRACT_ADDRESS || "";
export const KEYWORD_CONTRACT_ADDRESS = process.env.REACT_APP_KEYWORD_CONTRACT_ADDRESS || "";
export const NET_WORD_ID = process.env.REACT_APP_NET_WORD_ID || "";
export const CHAIN_ID = process.env.REACT_APP_CHAIN_ID || "";
export const CHAIN_NAME = process.env.REACT_APP_CHAIN_NAME || "";
export const BLOCK_EXPLORE_URL = process.env.REACT_APP_BLOCK_EXPLORE_URL || "";
export const RPC_URL = process.env.REACT_APP_RPC_URL || "";
export const CURRENCY_NAME = process.env.REACT_APP_CURRENCY_NAME || "";
export const CURRENCY_SYMBOL = process.env.REACT_APP_CURRENCY_SYMBOL || "";
export const CURRENCY_DECIMALS = process.env.REACT_APP_CURRENCY_DECIMALS || "";
export const CURRENCY_SYMBOL_WEB = process.env.REACT_APP_CURRENCY_SYMBOL_WEB || "";
export const TESTNET_WEB = process.env.REACT_APP_TESTNET_WEB || "";
