/* eslint-disable @typescript-eslint/no-unused-vars */
import Axios, { AxiosResponse, CancelTokenSource } from "axios";
import { access } from "fs";
import { PATH } from "helpers/constant";
import { pushTo } from "helpers/history";
import { showNotification } from "helpers/util";
import { setListConvenience } from "slices/selectSlice";
import stateStore from "slices/store";
import { STATUS_RESPONSE_CODE } from "types";
import {
  FormRequest,
  ConvenienceDetail,
  NotificationDetail,
  ParamsRequest,
  InputConvenience,
  InputUpdateConvenience,
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

export const getConvenienceMiddleware = async (
  params?: ParamsRequest,
  source?: CancelTokenSource
) => {
  const accessToken: string = localStorage.getItem("access_token") || "";
  if (!accessToken.length) {
    pushTo(PATH.login);
    return;
  }

  const response: AxiosResponse<{
    data: {
      data: ConvenienceDetail[];
      total: number;
      // totalPage: number;
    };
    message: string;
    statusCode: number;
  }> = await Axios.get(`/convenience/admin`, {
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

  stateStore.dispatch(setListConvenience(response.data.data.data));

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

export const addConvenienceMiddleware = (
  formInput: InputConvenience,
  callBack: (status: STATUS_RESPONSE_CODE) => void,
) => {
  Axios.post(`/convenience/admin/create`, formInput)
    .then((response: any) => {
      if (response.data.statusCode === STATUS_RESPONSE_CODE.SUCCESS) {
        showNotification("success", "Create new Convenience successfully!");
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

export const updateConvenienceMiddleware = (
  formUpdate: InputUpdateConvenience,
  callBack: (status: STATUS_RESPONSE_CODE) => void,
) => {
  Axios.post(`/convenience/admin/update`, formUpdate)
    .then((response: any) => {
      if (response.data.statusCode === STATUS_RESPONSE_CODE.SUCCESS) {
        showNotification("success", "Update Convenience successfully!");
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

export const deleteConvenience = (
  id: string,
  callBack: (status: STATUS_RESPONSE_CODE) => void,
) => {
  Axios.delete(`/api/system/star/${id}`)
    .then((res: any) => {
      if (res.data?.statusCode >= 400) {
        callBack(STATUS_RESPONSE_CODE.ERROR);
        showNotification("error", res.data.message || `Delete star error`);
      } else {
        callBack(STATUS_RESPONSE_CODE.SUCCESS);
        showNotification("success", `Delete star successful`);
      }
    })
    .catch(() => {
      callBack(STATUS_RESPONSE_CODE.ERROR);
      showNotification("error", `Delete star error`);
    });
};

export const uploadImageMiddleware = (
  formData: FormData,
) => {
  return Axios.post(`/media/admin/uploadImage`, formData);
};