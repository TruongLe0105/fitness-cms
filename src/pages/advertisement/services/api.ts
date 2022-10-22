/* eslint-disable @typescript-eslint/no-explicit-any */
import Axios, { AxiosResponse, CancelTokenSource } from "axios";
import { HistoryDefaultDetail } from "components/History/types";
import { showNotification } from "helpers/util";
import { STATUS_RESPONSE_CODE } from "types";
import {
  ParamsAdvertisementRequest,
  RequestPostNewAdvertisementProp,
  AdvertisementDetail,
} from "../types";
// eslint-disable-next-line
export const getAdvertisementMiddleware = async (
  params: ParamsAdvertisementRequest,
  source?: CancelTokenSource
) => {
  const response: AxiosResponse<{
    data: {
      items: AdvertisementDetail[];
      total: number;
    };
  }> = await Axios.get(`/api/advertisement/all`, {
    params,
    cancelToken: source && source.token,
  });

  return response.data.data;
};

export const CreateAdvertisementMiddleware = (
  request: {
    link: any;
    name: string;
  },
  callBack: (status: STATUS_RESPONSE_CODE, dataRes?: any) => void
) => {
  const formData = new FormData();
  if (request.link) {
    formData.append("file", request.link);
  }
  if (request.name) {
    formData.append("name", request.name);
  }
  formData.append("_method", "POST");
  Axios.post(`/api/advertisement`, formData)
    .then((response: any) => {
      if (response.data.statusCode === STATUS_RESPONSE_CODE.SUCCESS) {
        showNotification("success", "Update image advertisement successfully!");
        callBack(response.data.statusCode, response.data.data);
        return;
      }
      showNotification(
        "error",
        response.data.data ? response.data.data.errors : response.data.message
      );

      callBack(response.data.statusCode);
    })
    .catch(() => {
      callBack(STATUS_RESPONSE_CODE.ERROR);
    });
};