/* eslint-disable @typescript-eslint/no-explicit-any */
import Axios from "axios";
import { showNotification } from "helpers/util";
import { STATUS_RESPONSE_CODE } from "types";
// eslint-disable-next-line
export const getAdvertisementMiddleware = async (params, source) => {
    const response = await Axios.get(`/api/advertisement/all`, {
        params,
        cancelToken: source && source.token,
    });
    return response.data.data;
};
export const CreateAdvertisementMiddleware = (request, callBack) => {
    const formData = new FormData();
    if (request.link) {
        formData.append("file", request.link);
    }
    if (request.name) {
        formData.append("name", request.name);
    }
    formData.append("_method", "POST");
    Axios.post(`/api/advertisement`, formData)
        .then((response) => {
        if (response.data.statusCode === STATUS_RESPONSE_CODE.SUCCESS) {
            showNotification("success", "Update image advertisement successfully!");
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
