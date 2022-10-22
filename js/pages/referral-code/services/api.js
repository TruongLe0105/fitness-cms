import Axios from "axios";
// eslint-disable-next-line
export const getReferralCodeHistoryMiddleware = async (params, source) => {
    const response = await Axios.get(`/api/referral-history`, {
        params,
        cancelToken: source && source.token,
    });
    return response.data.data;
};
// eslint-disable-next-line
export const getReferralCodeRewardMiddleware = async (params, source) => {
    const response = await Axios.get(`/api/referral-reward`, {
        params,
        cancelToken: source && source.token,
    });
    return response.data.data;
};
