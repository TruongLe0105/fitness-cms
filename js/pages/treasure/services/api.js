/* eslint-disable @typescript-eslint/no-explicit-any */
import Axios from "axios";
import { showNotification } from "helpers/util";
import { STATUS_RESPONSE_CODE } from "types";
// eslint-disable-next-line
export const getSystemTreasureMiddleware = async (params, source) => {
    // console.log(process.env.REACT_APP_API_URL)
    const response = await Axios.get(`/api/treasure/all`, {
        params,
        cancelToken: source && source.token,
    });
    return response.data.data;
};
export const getArrayStarIdMiddleware = async (source) => {
    const response = await Axios.get(`/api/treasure/list-star`, {
        cancelToken: source && source.token,
    });
    return response.data.data;
};
// eslint-disable-next-line
export const updateStatusStarMiddleware = (idStar, request, callBack) => {
    Axios.put(`/api/treasure/all/${idStar}/status`, request)
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .then((response) => {
        if (response.data.statusCode === STATUS_RESPONSE_CODE.SUCCESS) {
            showNotification("success", "Update status star successfully!");
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
export const updateNameRegisterStarMiddleware = (idTreasure, request, callBack) => {
    Axios.put(`/api/treasure/all/${idTreasure}/register/name`, request)
        .then((response) => {
        if (response.data.statusCode === STATUS_RESPONSE_CODE.SUCCESS) {
            showNotification("success", "Update name register successfully!");
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
export const updateImageStarMiddleware = (idTreasure, request, callBack) => {
    const formData = new FormData();
    if (request?.image) {
        formData.append("file", request.image);
    }
    // formData.append("_method", "POST");
    Axios.post(`/api/treasure/image`, formData)
        .then((response) => {
        if (response.data.statusCode === STATUS_RESPONSE_CODE.SUCCESS) {
            showNotification("success", "Update image star successfully!");
            callBack?.(response.data.statusCode, response.data.data);
            return;
        }
        showNotification("error", response.data.data ? response.data.data.errors : response.data.message);
        if (callBack) {
            callBack(response.data.statusCode);
        }
    })
        .catch(() => {
        if (callBack) {
            callBack?.(STATUS_RESPONSE_CODE.ERROR);
        }
    });
};
// eslint-disable-next-line
export const updateImagePreviewTreasureMiddleware = (idTreasure, request, callBack) => {
    const formData = new FormData();
    if (request.imagePreview) {
        formData.append("imagePreview", request.imagePreview);
    }
    formData.append("_method", "PUT");
    Axios.put(`/api/treasure/all/${idTreasure}/image-preview`, formData)
        .then((response) => {
        if (response.data.statusCode === STATUS_RESPONSE_CODE.SUCCESS) {
            showNotification("success", "Update image preview star successfully!");
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
export const pushImageTreasureMiddleware = (request, callBack) => {
    console.log("upload");
    const formData = new FormData();
    if (request.image) {
        formData.append("file", request.image);
    }
    formData.append("_method", "POST");
    Axios.post(`/api/treasure/image`, formData)
        .then((response) => {
        if (response.data.statusCode === STATUS_RESPONSE_CODE.SUCCESS) {
            showNotification("success", "Update image treasure successfully!");
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
export const createTreasureMiddleware = (request, callBack) => {
    Axios.post(`/api/treasure/image`, request)
        .then((response) => {
        if (response.data.statusCode === STATUS_RESPONSE_CODE.SUCCESS) {
            showNotification("success", "create treasure successfully!");
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
// eslint-disable-next-line
export const updateBIOTreasureMiddleware = (idTreasure, request, callBack) => {
    Axios.put(`/api/treasure/all/${idTreasure}/bio`, request)
        .then((response) => {
        if (response.data.statusCode === STATUS_RESPONSE_CODE.SUCCESS) {
            showNotification("success", "Update BIO successfully!");
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
// eslint-disable-next-line
export const getHistoryStarMiddleware = async (idNft, params) => {
    const response = await Axios.get(`/api/treasure/all/${idNft}`, {
        params,
    });
    return response.data.data;
};
export const getStarDetailMiddleware = async (starId) => {
    const response = await Axios.get(`/api/system/star/detail/${starId}`);
    return response.data.data;
};
// eslint-disable-next-line
export const setMintPriceTreasureMiddleware = async (body, callback) => {
    Axios.post("/api/treasure/all/set-mint-price", body)
        .then(() => {
        callback(STATUS_RESPONSE_CODE.SUCCESS);
        showNotification("success", "Set price successfully!");
    })
        .catch((err) => {
        callback(STATUS_RESPONSE_CODE.ERROR);
        console.log(err);
        showNotification("error", "Fail to set price");
    });
};
// eslint-disable-next-line
export const lockTreasureMiddleware = (id, locked, callback) => {
    Axios.put(`/api/treasure/all/${id}/locked`, {
        locked,
    })
        .then((res) => {
        if (res.data?.statusCode >= 400) {
            callback(STATUS_RESPONSE_CODE.ERROR);
            showNotification("error", res.data.message || `Fail to ${locked ? "lock" : "unlock"} treasure`);
        }
        else {
            callback(STATUS_RESPONSE_CODE.SUCCESS);
            showNotification("success", `${locked ? "Lock" : "Unlock"} treasure successfully`);
        }
    })
        .catch(() => {
        callback(STATUS_RESPONSE_CODE.ERROR);
        showNotification("error", `Fail to ${locked ? "lock" : "unlock"} treasure`);
    });
};
// eslint-disable-next-line
export const postNewStar = (request, onSuccess, onError) => {
    Axios.post(`/api/treasure`, request)
        .then((res) => {
        if (res.data?.statusCode >= 400) {
            onError();
            showNotification("error", res.data.message || `Add new treasure error`);
        }
        else {
            onSuccess();
            showNotification("success", `Add new treasure successful`);
        }
    })
        .catch(() => {
        onError();
        showNotification("error", `Add new treasure error`);
    });
};
export const updateStar = (id, request, onSuccess, onError) => {
    Axios.patch(`/api/treasure/all/${id}`, request)
        .then((res) => {
        if (res.data?.statusCode >= 400) {
            onError();
            showNotification("error", res.data.message || `Update star error`);
        }
        else {
            onSuccess();
            showNotification("success", `Update star successful`);
        }
    })
        .catch(() => {
        onError();
        showNotification("error", `Update star error`);
    });
};
export const deleteTreasure = (id, callback) => {
    Axios.delete(`/api/treasure/all/${id}`)
        .then((res) => {
        if (res.data?.statusCode >= 400) {
            callback(STATUS_RESPONSE_CODE.ERROR);
            showNotification("error", res.data.message || `Delete star error`);
        }
        else {
            callback(STATUS_RESPONSE_CODE.SUCCESS);
            showNotification("success", `Delete star successful`);
        }
    })
        .catch(() => {
        callback(STATUS_RESPONSE_CODE.ERROR);
        showNotification("error", `Delete star error`);
    });
};
