import Axios, { AxiosResponse, CancelTokenSource } from "axios";
import {
  ParamsRequestHistory,
  ParamsRequestReward,
  ReferralCodeHistoryDetail,
  ReferralCodeRewardDetail,
} from "../types";
// eslint-disable-next-line
export const getReferralCodeHistoryMiddleware = async (
  params: ParamsRequestHistory,
  source?: CancelTokenSource
) => {
  const response: AxiosResponse<{
    data: {
      items: ReferralCodeHistoryDetail[];
      total: number;
    };
  }> = await Axios.get(`/api/referral-history`, {
    params,
    cancelToken: source && source.token,
  });
  return response.data.data;
};

// eslint-disable-next-line
export const getReferralCodeRewardMiddleware = async (
  params: ParamsRequestReward,
  source?: CancelTokenSource
) => {
  const response: AxiosResponse<{
    data: {
      items: ReferralCodeRewardDetail[];
      total: number;
    };
  }> = await Axios.get(`/api/referral-reward`, {
    params,
    cancelToken: source && source.token,
  });
  return response.data.data;
};
