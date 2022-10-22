import Axios, { AxiosResponse, CancelTokenSource } from "axios";
import { ParamsRequest, UserMobileDetail } from "../types";
// eslint-disable-next-line
export const getUserMobileMiddleware = async (
  params: ParamsRequest,
  source?: CancelTokenSource
) => {
  const response: AxiosResponse<{
    data: {
      items: UserMobileDetail[];
      total: number;
    };
  }> = await Axios.get(`/api/users`, {
    params,
    cancelToken: source && source.token,
  });
  return response.data.data;
};

// eslint-disable-next-line
export const getUserProfileMiddleware = async (idUser: string) => {
  const response: AxiosResponse<{
    data: UserMobileDetail;
  }> = await Axios.get(`/api/users/${idUser}/user-profile`);
  return response.data.data;
};
