/* eslint-disable @typescript-eslint/no-unused-vars */
import Axios from "axios";
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
export const getRewardHistoryMiddleware = async (params, source) => {
    // console.log("params:", params);
    // console.log("source:", source);
    const response = await Axios.get(`/reward-history/all`, {
        params,
        cancelToken: source && source.token,
    });
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
