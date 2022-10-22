/* eslint-disable @typescript-eslint/no-explicit-any */
import Axios from "axios";
import { showNotification } from "helpers/util";
import { STATUS_RESPONSE_CODE } from "types";
// eslint-disable-next-line
export const getSystemKeywordMiddleware = async (params, source) => {
    const response = await Axios.get(`/api/system-keywords`, {
        params,
        cancelToken: source && source.token,
    });
    return response.data.data;
};
// eslint-disable-next-line
export const importKeywordMiddleware = (request, callBack) => {
    const formData = new FormData();
    if (request.file) {
        formData.append("file", request.file);
    }
    formData.append("_method", "POST");
    Axios.post(`/api/system-keywords/import`, formData)
        .then((response) => {
        if (response.data.statusCode === STATUS_RESPONSE_CODE.SUCCESS) {
            showNotification("success", "Import keywords successfully!");
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
export const addKeywordMiddleware = (request, callBack) => {
    Axios.post(`/api/system-keywords`, request)
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .then((response) => {
        if (response.data.statusCode === STATUS_RESPONSE_CODE.SUCCESS) {
            showNotification("success", "Create new keyword successfully!");
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
export const updateKeywordMiddleware = (idKeyword, request, callBack) => {
    Axios.patch(`/api/system-keywords/${idKeyword}`, request)
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .then((response) => {
        if (response.data.statusCode === STATUS_RESPONSE_CODE.SUCCESS) {
            showNotification("success", "Update keyword successfully!");
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
export const sellKeywordMiddleware = (idKeywords, callBack) => {
    Axios.post(`/api/system-keywords/sell`, {
        ids: idKeywords,
    })
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .then((response) => {
        if (response.data.statusCode === STATUS_RESPONSE_CODE.SUCCESS) {
            showNotification("success", "Sell keyword successfully!");
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
export const cancelSellKeywordMiddleware = (idKeywords, callBack) => {
    Axios.post(`/api/system-keywords/cancel-sell`, {
        ids: idKeywords,
    })
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .then((response) => {
        if (response.data.statusCode === STATUS_RESPONSE_CODE.SUCCESS) {
            showNotification("success", "Cancel Sell Keyword successfully!");
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
export const getHistoryKeywordMiddleware = async (idNft, params) => {
    const response = await Axios.get(`/api/history-owner/Keyword/${idNft}`, {
        params,
    });
    return response.data.data;
};
// eslint-disable-next-line
export const setMintPriceKeywordMiddleware = async (body, callback) => {
    Axios.post("/api/system-keywords/set-mint-price", body)
        .then(() => {
        callback(STATUS_RESPONSE_CODE.SUCCESS);
        showNotification("success", "Set price successfully!");
    })
        .catch(() => {
        callback(STATUS_RESPONSE_CODE.ERROR);
        showNotification("error", "Fail to set price");
    });
};
export const getKeywordCategoryMiddleware = async () => {
    try {
        const response = await Axios.get(`/api/system-keyword-categories`, {
            params: {
                orderDirection: "ASC",
            },
        });
        return response.data.data;
    }
    catch (err) {
        showNotification("error", "Fail to get keyword category");
        return [];
    }
};
export const addKeywordCategoryMiddleware = (bodyUpdate, setLoading, handleSuccess) => {
    setLoading(true);
    Axios.post(`/api/system-keyword-categories`, bodyUpdate)
        .then((res) => {
        if (res.data?.statusCode >= 400) {
            showNotification("error", res.data.message || `Add keyword category failed`);
        }
        else {
            handleSuccess(res.data?.data);
            showNotification("success", `Add keyword category successfully`);
        }
        setLoading(false);
    })
        .catch(() => {
        setLoading(false);
        showNotification("error", `Add keyword category failed`);
    });
};
export const updateKeywordCategoryMiddleware = (id, bodyUpdate, setLoading, handleSuccess) => {
    setLoading(true);
    Axios.patch(`/api/system-keyword-categories/${id}`, bodyUpdate)
        .then((res) => {
        if (res.data?.statusCode >= 400) {
            showNotification("error", res.data.message || `Update keyword category failed`);
        }
        else {
            handleSuccess(res.data?.data);
            showNotification("success", `Update keyword category successfully`);
        }
        setLoading(false);
    })
        .catch(() => {
        setLoading(false);
        showNotification("error", `Update keyword category failed`);
    });
};
export const deleteKeywordCategoryMiddleware = (id, setLoading, handleSuccess) => {
    setLoading(true);
    Axios.delete(`/api/system-keyword-categories/${id}`)
        .then((res) => {
        if (res.data?.statusCode >= 400) {
            showNotification("error", res.data.message || `Delete keyword category failed`);
        }
        else {
            handleSuccess();
            showNotification("success", `Delete keyword category successfully`);
        }
        setLoading(false);
    })
        .catch(() => {
        setLoading(false);
        showNotification("error", `Delete keyword category failed`);
    });
};
