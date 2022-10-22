/* eslint-disable @typescript-eslint/no-explicit-any */
import Axios, { AxiosResponse, CancelTokenSource } from "axios";
import { HistoryDefaultDetail } from "components/History/types";
import { showNotification } from "helpers/util";
import { SetMintPriceBody } from "pages/stars/types";
import { STATUS_RESPONSE_CODE } from "types";
import {
  FormInputKeyword,
  KeywordCategory,
  ParamsKeywordHistoryRequest,
  ParamsKeywordRequest,
  SystemKeywordDetail,
} from "../types";

// eslint-disable-next-line
export const getSystemKeywordMiddleware = async (
  params: ParamsKeywordRequest,
  source?: CancelTokenSource
) => {
  const response: AxiosResponse<{
    data: {
      items: SystemKeywordDetail[];
      total: number;
    };
  }> = await Axios.get(`/api/system-keywords`, {
    params,
    cancelToken: source && source.token,
  });
  return response.data.data;
};
// eslint-disable-next-line
export const importKeywordMiddleware = (
  request: {
    file: any;
  },
  callBack: (status: STATUS_RESPONSE_CODE) => void
) => {
  const formData = new FormData();
  if (request.file) {
    formData.append("file", request.file);
  }
  formData.append("_method", "POST");
  Axios.post(`/api/system-keywords/import`, formData)
    .then((response: any) => {
      if (response.data.statusCode === STATUS_RESPONSE_CODE.SUCCESS) {
        showNotification("success", "Import keywords successfully!");
        callBack(response.data.statusCode);
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

// eslint-disable-next-line
export const addKeywordMiddleware = (
  request: FormInputKeyword,
  callBack: (status: STATUS_RESPONSE_CODE) => void
) => {
  Axios.post(`/api/system-keywords`, request)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .then((response: any) => {
      if (response.data.statusCode === STATUS_RESPONSE_CODE.SUCCESS) {
        showNotification("success", "Create new keyword successfully!");
        callBack(response.data.statusCode);
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
// eslint-disable-next-line
export const updateKeywordMiddleware = (
  idKeyword: string,
  request: FormInputKeyword,
  callBack: (
    status: STATUS_RESPONSE_CODE,
    dataRes?: SystemKeywordDetail
  ) => void
) => {
  Axios.patch(`/api/system-keywords/${idKeyword}`, request)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .then((response: any) => {
      if (response.data.statusCode === STATUS_RESPONSE_CODE.SUCCESS) {
        showNotification("success", "Update keyword successfully!");
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

// eslint-disable-next-line
export const sellKeywordMiddleware = (
  idKeywords: string[],
  callBack: (status: STATUS_RESPONSE_CODE) => void
) => {
  Axios.post(`/api/system-keywords/sell`, {
    ids: idKeywords,
  })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .then((response: any) => {
      if (response.data.statusCode === STATUS_RESPONSE_CODE.SUCCESS) {
        showNotification("success", "Sell keyword successfully!");
        callBack(response.data.statusCode);
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

// eslint-disable-next-line
export const cancelSellKeywordMiddleware = (
  idKeywords: string[],
  callBack: (status: STATUS_RESPONSE_CODE) => void
) => {
  Axios.post(`/api/system-keywords/cancel-sell`, {
    ids: idKeywords,
  })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .then((response: any) => {
      if (response.data.statusCode === STATUS_RESPONSE_CODE.SUCCESS) {
        showNotification("success", "Cancel Sell Keyword successfully!");
        callBack(response.data.statusCode);
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

// eslint-disable-next-line
export const getHistoryKeywordMiddleware = async (
  idNft: string,
  params: ParamsKeywordHistoryRequest
) => {
  const response: AxiosResponse<{
    data: {
      items: HistoryDefaultDetail[];
      total: number;
    };
  }> = await Axios.get(`/api/history-owner/Keyword/${idNft}`, {
    params,
  });

  return response.data.data;
};
// eslint-disable-next-line
export const setMintPriceKeywordMiddleware = async (
  body: SetMintPriceBody[],
  callback: (status: STATUS_RESPONSE_CODE) => void
) => {
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
    const response: AxiosResponse<{
      data: KeywordCategory[];
    }> = await Axios.get(`/api/system-keyword-categories`, {
      params: {
        orderDirection: "ASC",
      },
    });
    return response.data.data;
  } catch (err) {
    showNotification("error", "Fail to get keyword category");
    return [];
  }
};

export const addKeywordCategoryMiddleware = (
  bodyUpdate: {
    name: string;
    hide: boolean;
  },
  setLoading: (value: boolean) => void,
  handleSuccess: (value: KeywordCategory) => void
): void => {
  setLoading(true);
  Axios.post(`/api/system-keyword-categories`, bodyUpdate)
    .then((res: any) => {
      if (res.data?.statusCode >= 400) {
        showNotification(
          "error",
          res.data.message || `Add keyword category failed`
        );
      } else {
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

export const updateKeywordCategoryMiddleware = (
  id: number,
  bodyUpdate: {
    name: string;
    hide: boolean;
  },
  setLoading: (value: boolean) => void,
  handleSuccess: (value: KeywordCategory) => void
): void => {
  setLoading(true);
  Axios.patch(`/api/system-keyword-categories/${id}`, bodyUpdate)
    .then((res: any) => {
      if (res.data?.statusCode >= 400) {
        showNotification(
          "error",
          res.data.message || `Update keyword category failed`
        );
      } else {
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

export const deleteKeywordCategoryMiddleware = (
  id: number,
  setLoading: (value: boolean) => void,
  handleSuccess: () => void
): void => {
  setLoading(true);
  Axios.delete(`/api/system-keyword-categories/${id}`)
    .then((res: any) => {
      if (res.data?.statusCode >= 400) {
        showNotification(
          "error",
          res.data.message || `Delete keyword category failed`
        );
      } else {
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
