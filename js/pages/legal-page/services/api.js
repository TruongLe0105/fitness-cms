import Axios from "axios";
import { showNotification } from "helpers/util";
import { STATUS_RESPONSE_CODE } from "types";
// eslint-disable-next-line
export const getSettingLegalMiddleware = async (name) => {
    const response = await Axios.get(`/api/setting/legal/${name}`);
    return response.data.data;
};
// eslint-disable-next-line
export const updateSettingLegalMiddleware = (field, title, request, callBack) => {
    Axios.put(`/api/setting/legal/${field}`, request)
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
