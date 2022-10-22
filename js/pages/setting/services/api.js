/* eslint-disable @typescript-eslint/no-explicit-any */
import Axios from "axios";
import { showNotification } from "helpers/util";
import { STATUS_RESPONSE_CODE } from "types";
import { SettingType, } from "../types";
export const getRewardMiddleware = async (field) => {
    const response = await Axios.get(`/api/setting/referral/${field}`);
    return response.data.data;
};
export const updateSettingReferralMiddleware = (field, title, request, callBack) => {
    Axios.put(`/api/setting/referral/${field}`, request)
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .then((response) => {
        if (response.data.statusCode === STATUS_RESPONSE_CODE.SUCCESS) {
            showNotification("success", `Update ${title} successfully!`);
            callBack(response.data.statusCode, response.data.data);
            return;
        }
        showNotification("error", response.data.data ? response.data.data.errors : response.data.message);
        callBack(response.data.statusCode);
    })
        .catch(() => {
        callBack(STATUS_RESPONSE_CODE.ERROR);
    });
};
export const getSettingMiddleware = (type, name, callBack) => {
    Axios.get(`/api/setting/${type}/${name}`)
        .then((res) => callBack(STATUS_RESPONSE_CODE.SUCCESS, res.data.data?.value))
        .catch(() => callBack(STATUS_RESPONSE_CODE.SUCCESS));
};
export const updateSettingMiddleware = (title, type, name, body, callBack, isSetBanner) => {
    Axios.put(`/api/setting/${type}/${name}`, isSetBanner ? body.value : body)
        .then((res) => {
        showNotification("success", `Update ${title} successfully!`);
        callBack(STATUS_RESPONSE_CODE.SUCCESS, res.data?.data?.value);
    })
        .catch(() => {
        showNotification("error", `Fail to update ${title}`);
        callBack(STATUS_RESPONSE_CODE.ERROR);
    });
};
export const getBannerMiddleware = (name, callBack) => {
    Axios.get(`/api/setting/${SettingType.BANNER}/${name}`)
        .then((res) => callBack(STATUS_RESPONSE_CODE.SUCCESS, res.data.data?.value))
        .catch(() => callBack(STATUS_RESPONSE_CODE.SUCCESS));
};
export const updateBannerMiddleware = (title, name, body, callBack) => {
    Axios.put(`/api/setting/${SettingType.BANNER}/${name}`, body)
        .then((res) => {
        showNotification("success", `Update ${title} successfully!`);
        callBack(STATUS_RESPONSE_CODE.SUCCESS, res.data?.data?.value);
    })
        .catch(() => {
        showNotification("error", `Fail to update ${title}`);
        callBack(STATUS_RESPONSE_CODE.ERROR);
    });
};
export const deleteBannerMiddleware = (title, name, callBack) => {
    Axios.delete(`/api/setting/${SettingType.BANNER}/${name}`)
        .then((res) => {
        showNotification("success", `Delete ${title} successfully!`);
        callBack(STATUS_RESPONSE_CODE.SUCCESS, res.data?.data?.value);
    })
        .catch(() => {
        showNotification("error", `Fail to delete ${title}`);
        callBack(STATUS_RESPONSE_CODE.ERROR);
    });
};
export const getSettingStringMiddleware = (type, name, callBack) => {
    Axios.get(`/api/setting/${type}/${name}/string`)
        .then((res) => callBack(STATUS_RESPONSE_CODE.SUCCESS, res.data.data?.value))
        .catch(() => callBack(STATUS_RESPONSE_CODE.SUCCESS));
};
export const updateSettingStringMiddleware = (title, type, name, body, callBack, isSetBanner) => {
    Axios.put(`/api/setting/${type}/${name}/string`, isSetBanner ? body.value : body)
        .then((res) => {
        showNotification("success", `Update ${title} successfully!`);
        callBack(STATUS_RESPONSE_CODE.SUCCESS, res.data?.data?.value);
    })
        .catch(() => {
        showNotification("error", `Fail to update ${title}`);
        callBack(STATUS_RESPONSE_CODE.ERROR);
    });
};
