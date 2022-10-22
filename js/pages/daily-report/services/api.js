/* eslint-disable @typescript-eslint/no-unused-vars */
import Axios from "axios";
import { PATH } from "helpers/constant";
import { pushTo } from "helpers/history";
import { showNotification } from "helpers/util";
import { STATUS_RESPONSE_CODE } from "types";
// eslint-disable-next-line
export const getNotificationsMiddleware = async (params, source) => {
    const response = await Axios.get(`/api/notifications`, {
        params,
        cancelToken: source && source.token,
    });
    return response.data.data;
};
export const getDailyReportMiddleware = async (params, source) => {
    // console.log("params:", params);
    // console.log("source:", source);
    const accessToken = localStorage.getItem("access_token") || "";
    if (!accessToken.length) {
        pushTo(PATH.login);
        return;
    }
    const response = await Axios.get(`/admin/getPVCResult`, {
        params,
        cancelToken: source && source.token,
        headers: {
            "x-access-token": accessToken,
        },
    });
    console.log("aaaaadasdas", response.data);
    if (response.data.message === "Invalid token ! ") {
        localStorage.removeItem("access_token");
        pushTo(PATH.login);
        return;
    }
    console.log(response.data);
    //
    return response.data.data;
};
// eslint-disable-next-line
export const addNotificationMiddleware = (request, callBack) => {
    Axios.post(`/api/notifications`, request)
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .then((response) => {
        if (response.data.statusCode === STATUS_RESPONSE_CODE.SUCCESS) {
            showNotification("success", "Create new notification successfully!");
            callBack(response.data.statusCode);
            return;
        }
        showNotification("error", response.data.data ? response.data.data.errors : response.data.message);
        callBack(response.data.statusCode);
    })
        .catch(() => {
        callBack(STATUS_RESPONSE_CODE.ERROR);
    });
};
// eslint-disable-next-line
export const updateNotificationMiddleware = (idNotification, request, callBack) => {
    Axios.patch(`/api/notifications/${idNotification}`, request)
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .then((response) => {
        if (response.data.statusCode === STATUS_RESPONSE_CODE.SUCCESS) {
            showNotification("success", "Update notification successfully!");
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
