import Axios from "axios";
import { showNotification } from "helpers/util";
import { STATUS_RESPONSE_CODE } from "types";
// eslint-disable-next-line
export const deleteMiddleware = (url, messages, callBack) => {
    Axios.delete(url)
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .then((response) => {
        if (response.data.statusCode === STATUS_RESPONSE_CODE.SUCCESS) {
            showNotification("success", messages);
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
