/* eslint-disable @typescript-eslint/no-unused-vars */
import Axios, { AxiosResponse, CancelTokenSource } from "axios";
import { InputClient } from "components/form/type";
import { access } from "fs";
import { PATH } from "helpers/constant";
import { pushTo } from "helpers/history";
import { showNotification } from "helpers/util";
import { STATUS_RESPONSE_CODE } from "types";
import {
  FormRequest,
  MerchantDetail,
  NotificationDetail,
  ParamsRequest,
} from "../types";
// eslint-disable-next-line
export const getNotificationsMiddleware = async (
  params: ParamsRequest,
  source?: CancelTokenSource
) => {
  const response: AxiosResponse<{
    data: {
      items: NotificationDetail[];
      total: number;
    };
  }> = await Axios.get(`/api/notifications`, {
    params,
    cancelToken: source && source.token,
  });
  return response.data.data;
};

export const getMerchantMiddleware = async (
  params: ParamsRequest,
  source?: CancelTokenSource
) => {
  const accessToken: string = localStorage.getItem("access_token") || "";
  if (!accessToken.length) {
    pushTo(PATH.login);
    return;
  }

  const response: AxiosResponse<{
    data: {
      data: MerchantDetail[];
      total: number;
      totalPage: number;
    };
    message: string;
    statusCode: number;
  }> = await Axios.get(`/merchant/admin`, {
    params,
    headers: {
      "x-access-token": accessToken,
    },
  });

  if (response.data.message === "Invalid token ! ") {
    localStorage.removeItem("access_token");
    pushTo(PATH.login);
    return;
  }

  return response.data.data;
};

// eslint-disable-next-line
export const addNotificationMiddleware = (
  request: FormRequest,
  callBack: (status: STATUS_RESPONSE_CODE) => void
) => {
  Axios.post(`/api/notifications`, request)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .then((response: any) => {
      if (response.data.statusCode === STATUS_RESPONSE_CODE.SUCCESS) {
        showNotification("success", "Create new notification successfully!");
        callBack(response.data.statusCode);
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

// eslint-disable-next-line
export const updateNotificationMiddleware = (
  idNotification: number,
  request: FormRequest,
  callBack: (status: STATUS_RESPONSE_CODE, dataRes?: NotificationDetail) => void
) => {
  Axios.patch(`/api/notifications/${idNotification}`, request)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .then((response: any) => {
      if (response.data.statusCode === STATUS_RESPONSE_CODE.SUCCESS) {
        showNotification("success", "Update notification successfully!");
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

export const addNewClientMiddleware = (
  request: InputClient,
  callBack: (status: STATUS_RESPONSE_CODE) => void,
) => {
  Axios.post(`/admin/createMerchant`, request)
    .then((response: any) => {
      if (response.data.statusCode === STATUS_RESPONSE_CODE.SUCCESS) {
        showNotification("success", "Create new Merchant successfully!");
        callBack(response.data.statusCode);
        return;
      }
      showNotification(
        "error",
        response.data.data ? response.data.data.errors : response.data.message
      );

      callBack(response.data.statusCode);
    })
    .catch(() => {
      callBack(STATUS_RESPONSE_CODE.ERROR)
    })
}
