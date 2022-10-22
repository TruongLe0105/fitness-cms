import axios from "axios";
import { showNotification } from "helpers/util";
import { STATUS_RESPONSE_CODE } from "types";
const baseURL = "/api/manage-versions";
export const getListVersionsMiddleware = async (params) => {
    const response = await axios.get(baseURL, {
        params,
    });
    return response.data.data;
};
export const getVersionMiddleware = async (id) => {
    const response = await axios.get(`${baseURL}/${id}`);
    return response.data.data;
};
export const createVersionMiddleware = async (body, callBack) => {
    axios
        .post(`${baseURL}`, body)
        .then((response) => {
        if (response.data?.statusCode >= 400) {
            console.log("response.data", response.data);
            callBack(STATUS_RESPONSE_CODE.ERROR);
            showNotification("error", response.data.message || `Add version error`);
        }
        else {
            showNotification("success", "Add version successfully!");
            callBack(STATUS_RESPONSE_CODE.SUCCESS);
        }
    })
        .catch(() => {
        callBack(STATUS_RESPONSE_CODE.ERROR);
        showNotification("error", `Add version error`);
    });
};
export const updateVersionMiddleware = async (id, body, callBack) => {
    axios
        .patch(`${baseURL}/${id}`, body)
        .then((response) => {
        if (response.data?.statusCode >= 400) {
            callBack(STATUS_RESPONSE_CODE.ERROR);
            showNotification("error", response.data.message || `Update version error`);
        }
        else {
            showNotification("success", "Update version successfully!");
            callBack(STATUS_RESPONSE_CODE.SUCCESS);
        }
    })
        .catch(() => {
        callBack(STATUS_RESPONSE_CODE.ERROR);
        showNotification("error", `Update version error`);
    });
};
export const deleteVersionMiddleware = async (id, callBack) => {
    axios
        .delete(`${baseURL}/${id}`)
        .then((response) => {
        if (response.status === STATUS_RESPONSE_CODE.SUCCESS) {
            showNotification("success", "Delete version successfully!");
            callBack(STATUS_RESPONSE_CODE.SUCCESS);
            return;
        }
        callBack(STATUS_RESPONSE_CODE.ERROR);
    })
        .catch(() => {
        callBack(STATUS_RESPONSE_CODE.ERROR);
    });
};
