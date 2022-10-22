/* eslint-disable @typescript-eslint/no-explicit-any */
import Axios, { AxiosResponse } from "axios";
import { showNotification } from "helpers/util";
import { STATUS_RESPONSE_CODE } from "types";
import {
  Banner,
  RewardDetail,
  SettingName,
  SettingType,
  TYPE_SETTING,
} from "../types";

export const getRewardMiddleware = async (
  field: TYPE_SETTING
): Promise<RewardDetail> => {
  const response: AxiosResponse<{
    data: RewardDetail;
  }> = await Axios.get(`/api/setting/referral/${field}`);
  return response.data.data;
};

export const updateSettingReferralMiddleware = (
  field: TYPE_SETTING,
  title: string,
  request: {
    value: number;
  },
  callBack: (status: STATUS_RESPONSE_CODE, dataRes?: RewardDetail) => void
): void => {
  Axios.put(`/api/setting/referral/${field}`, request)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .then((response: any) => {
      if (response.data.statusCode === STATUS_RESPONSE_CODE.SUCCESS) {
        showNotification("success", `Update ${title} successfully!`);
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

export const getSettingMiddleware = (
  type: SettingType,
  name: SettingName,
  callBack: (status: STATUS_RESPONSE_CODE, dataRes?: any) => void
): void => {
  Axios.get(`/api/setting/${type}/${name}`)
    .then((res: AxiosResponse<{ data: { value: string } }>) =>
      callBack(STATUS_RESPONSE_CODE.SUCCESS, res.data.data?.value)
    )
    .catch(() => callBack(STATUS_RESPONSE_CODE.SUCCESS));
};

export const updateSettingMiddleware = (
  title: string,
  type: SettingType,
  name: SettingName,
  body: {
    value: number | FormData;
  },
  callBack: (status: STATUS_RESPONSE_CODE, dataRes?: any) => void,
  isSetBanner?: boolean
): void => {
  Axios.put(`/api/setting/${type}/${name}`, isSetBanner ? body.value : body)
    .then((res: any) => {
      showNotification("success", `Update ${title} successfully!`);
      callBack(STATUS_RESPONSE_CODE.SUCCESS, res.data?.data?.value);
    })
    .catch(() => {
      showNotification("error", `Fail to update ${title}`);
      callBack(STATUS_RESPONSE_CODE.ERROR);
    });
};

export const getBannerMiddleware = (
  name: Banner,
  callBack: (status: STATUS_RESPONSE_CODE, dataRes?: any) => void
): void => {
  Axios.get(`/api/setting/${SettingType.BANNER}/${name}`)
    .then((res: AxiosResponse<{ data: { value: string } }>) =>
      callBack(STATUS_RESPONSE_CODE.SUCCESS, res.data.data?.value)
    )
    .catch(() => callBack(STATUS_RESPONSE_CODE.SUCCESS));
};

export const updateBannerMiddleware = (
  title: string,
  name: Banner,
  body: FormData,
  callBack: (status: STATUS_RESPONSE_CODE, dataRes?: any) => void
): void => {
  Axios.put(`/api/setting/${SettingType.BANNER}/${name}`, body)
    .then((res: any) => {
      showNotification("success", `Update ${title} successfully!`);
      callBack(STATUS_RESPONSE_CODE.SUCCESS, res.data?.data?.value);
    })
    .catch(() => {
      showNotification("error", `Fail to update ${title}`);
      callBack(STATUS_RESPONSE_CODE.ERROR);
    });
};

export const deleteBannerMiddleware = (
  title: string,
  name: Banner,
  callBack: (status: STATUS_RESPONSE_CODE, dataRes?: any) => void
): void => {
  Axios.delete(`/api/setting/${SettingType.BANNER}/${name}`)
    .then((res: any) => {
      showNotification("success", `Delete ${title} successfully!`);
      callBack(STATUS_RESPONSE_CODE.SUCCESS, res.data?.data?.value);
    })
    .catch(() => {
      showNotification("error", `Fail to delete ${title}`);
      callBack(STATUS_RESPONSE_CODE.ERROR);
    });
};

export const getSettingStringMiddleware = (
  type: SettingType,
  name: SettingName,
  callBack: (status: STATUS_RESPONSE_CODE, dataRes?: any) => void
): void => {
  Axios.get(`/api/setting/${type}/${name}/string`)
    .then((res: AxiosResponse<{ data: { value: string } }>) =>
      callBack(STATUS_RESPONSE_CODE.SUCCESS, res.data.data?.value)
    )
    .catch(() => callBack(STATUS_RESPONSE_CODE.SUCCESS));
};

export const updateSettingStringMiddleware = (
  title: string,
  type: SettingType,
  name: SettingName,
  body: {
    value: string;
  },
  callBack: (status: STATUS_RESPONSE_CODE, dataRes?: any) => void,
  isSetBanner?: boolean
): void => {
  Axios.put(
    `/api/setting/${type}/${name}/string`,
    isSetBanner ? body.value : body
  )
    .then((res: any) => {
      showNotification("success", `Update ${title} successfully!`);
      callBack(STATUS_RESPONSE_CODE.SUCCESS, res.data?.data?.value);
    })
    .catch(() => {
      showNotification("error", `Fail to update ${title}`);
      callBack(STATUS_RESPONSE_CODE.ERROR);
    });
};
