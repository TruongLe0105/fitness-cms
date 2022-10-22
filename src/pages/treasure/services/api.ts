/* eslint-disable @typescript-eslint/no-explicit-any */
import Axios, { AxiosResponse, CancelTokenSource } from "axios";
import { HistoryDefaultDetail } from "components/History/types";
import { showNotification } from "helpers/util";
import { STATUS_RESPONSE_CODE } from "types";
import {
  ParamsStarHistoryRequest,
  ParamsTreasureRequest,
  RequestPostNewTreasureProp,
  SetMintPriceBody,
  TreasureDetail,
  TreasureInfo,
} from "../types";
// eslint-disable-next-line
export const getSystemTreasureMiddleware = async (
  params: ParamsTreasureRequest,
  source?: CancelTokenSource
) => {
  // console.log(process.env.REACT_APP_API_URL)
  const response: AxiosResponse<{
    data: {
      items: TreasureDetail[];
      total: number;
    };
  }> = await Axios.get(`/api/treasure/all`, {
    params,
    cancelToken: source && source.token,
  });

  return response.data.data;
};

export const getArrayStarIdMiddleware = async (
  source?: CancelTokenSource
) => {
  const response: AxiosResponse<{
    data: [];
  }> = await Axios.get(`/api/treasure/list-star`, {
    cancelToken: source && source.token,
  });
  return response.data.data;
};

// eslint-disable-next-line
export const updateStatusStarMiddleware = (
  idStar: string,
  request: {
    status: string;
  },
  callBack: (status: STATUS_RESPONSE_CODE) => void
) => {
  Axios.put(`/api/treasure/all/${idStar}/status`, request)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .then((response: any) => {
      if (response.data.statusCode === STATUS_RESPONSE_CODE.SUCCESS) {
        showNotification("success", "Update status star successfully!");
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
export const updateNameRegisterStarMiddleware = (
  idTreasure: string,
  request: {
    name: string;
  },
  callBack: (status: STATUS_RESPONSE_CODE) => void
) => {
  Axios.put(`/api/treasure/all/${idTreasure}/register/name`, request)
    .then((response: any) => {
      if (response.data.statusCode === STATUS_RESPONSE_CODE.SUCCESS) {
        showNotification("success", "Update name register successfully!");
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
export const updateImageStarMiddleware = (
  idTreasure?: string,
  request?: {
    image: any;
  },
  callBack?: (status: STATUS_RESPONSE_CODE, dataRes?: string) => void
) => {
  const formData = new FormData();
  if (request?.image) {
    formData.append("file", request.image);
  }
  // formData.append("_method", "POST");
  Axios.post(`/api/treasure/image`, formData)
    .then((response: any) => {
      if (response.data.statusCode === STATUS_RESPONSE_CODE.SUCCESS) {
        showNotification("success", "Update image star successfully!");
        callBack?.(response.data.statusCode, response.data.data);
        return;
      }
      showNotification(
        "error",
        response.data.data ? response.data.data.errors : response.data.message
      );
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
export const updateImagePreviewTreasureMiddleware = (
  idTreasure: string,
  request: {
    imagePreview: any;
  },
  callBack: (status: STATUS_RESPONSE_CODE, dataRes?: TreasureDetail) => void
) => {
  const formData = new FormData();
  if (request.imagePreview) {
    formData.append("imagePreview", request.imagePreview);
  }
  formData.append("_method", "PUT");
  Axios.put(`/api/treasure/all/${idTreasure}/image-preview`, formData)
    .then((response: any) => {
      if (response.data.statusCode === STATUS_RESPONSE_CODE.SUCCESS) {
        showNotification("success", "Update image preview star successfully!");
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

export const pushImageTreasureMiddleware = (
  request: {
    image: any;
  },
  callBack: (status: STATUS_RESPONSE_CODE, dataRes?: any) => void
) => {
  console.log("upload");
  const formData = new FormData();
  if (request.image) {
    formData.append("file", request.image);
  }
  formData.append("_method", "POST");
  Axios.post(`/api/treasure/image`, formData)
    .then((response: any) => {
      if (response.data.statusCode === STATUS_RESPONSE_CODE.SUCCESS) {
        showNotification("success", "Update image treasure successfully!");
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

export const createTreasureMiddleware = (
  request: {
    imgUrl;
    name;
    description;
    starId;
    tokenContract;
    total;
    type;
  },
  callBack: (status: STATUS_RESPONSE_CODE, dataRes?: any) => void
) => {
  Axios.post(`/api/treasure/image`, request)
    .then((response: any) => {
      if (response.data.statusCode === STATUS_RESPONSE_CODE.SUCCESS) {
        showNotification("success", "create treasure successfully!");
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
export const updateBIOTreasureMiddleware = (
  idTreasure: string,
  request: {
    bio: string;
  },
  callBack: (status: STATUS_RESPONSE_CODE, dataRes?: TreasureInfo) => void
) => {
  Axios.put(`/api/treasure/all/${idTreasure}/bio`, request)
    .then((response: any) => {
      if (response.data.statusCode === STATUS_RESPONSE_CODE.SUCCESS) {
        showNotification("success", "Update BIO successfully!");
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
export const getHistoryStarMiddleware = async (
  idNft: string,
  params: ParamsStarHistoryRequest
) => {
  const response: AxiosResponse<{
    data: {
      items: HistoryDefaultDetail[];
      total: number;
    };
  }> = await Axios.get(`/api/treasure/all/${idNft}`, {
    params,
  });

  return response.data.data;
};

export const getStarDetailMiddleware = async (starId?: string) => {
  const response: AxiosResponse<{
    data: {
      items: HistoryDefaultDetail[];
      total: number;
    };
  }> = await Axios.get(`/api/system/star/detail/${starId}`);

  return response.data.data;
};
// eslint-disable-next-line
export const setMintPriceTreasureMiddleware = async (
  body: SetMintPriceBody[],
  callback: (status: STATUS_RESPONSE_CODE) => void
) => {
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
export const lockTreasureMiddleware = (
  id: string,
  locked: boolean,
  callback: (status: STATUS_RESPONSE_CODE) => void
) => {
  Axios.put(`/api/treasure/all/${id}/locked`, {
    locked,
  })
    .then((res: any) => {
      if (res.data?.statusCode >= 400) {
        callback(STATUS_RESPONSE_CODE.ERROR);
        showNotification(
          "error",
          res.data.message || `Fail to ${locked ? "lock" : "unlock"} treasure`
        );
      } else {
        callback(STATUS_RESPONSE_CODE.SUCCESS);
        showNotification(
          "success",
          `${locked ? "Lock" : "Unlock"} treasure successfully`
        );
      }
    })
    .catch(() => {
      callback(STATUS_RESPONSE_CODE.ERROR);
      showNotification(
        "error",
        `Fail to ${locked ? "lock" : "unlock"} treasure`
      );
    });
};

// eslint-disable-next-line
export const postNewStar = (
  request: RequestPostNewTreasureProp,
  onSuccess: () => void,
  onError: () => void
) => {
  Axios.post(`/api/treasure`, request)
    .then((res: any) => {
      if (res.data?.statusCode >= 400) {
        onError();
        showNotification("error", res.data.message || `Add new treasure error`);
      } else {
        onSuccess();
        showNotification("success", `Add new treasure successful`);
      }
    })
    .catch(() => {
      onError();
      showNotification("error", `Add new treasure error`);
    });
};

export const updateStar = (
  id: string,
  request: RequestPostNewTreasureProp,
  onSuccess: () => void,
  onError: () => void
) => {
  Axios.patch(`/api/treasure/all/${id}`, request)
    .then((res: any) => {
      if (res.data?.statusCode >= 400) {
        onError();
        showNotification("error", res.data.message || `Update star error`);
      } else {
        onSuccess();
        showNotification("success", `Update star successful`);
      }
    })
    .catch(() => {
      onError();
      showNotification("error", `Update star error`);
    });
};

export const deleteTreasure = (
  id: string,
  callback: (status: STATUS_RESPONSE_CODE) => void
) => {
  Axios.delete(`/api/treasure/all/${id}`)
    .then((res: any) => {
      if (res.data?.statusCode >= 400) {
        callback(STATUS_RESPONSE_CODE.ERROR);
        showNotification("error", res.data.message || `Delete star error`);
      } else {
        callback(STATUS_RESPONSE_CODE.SUCCESS);
        showNotification("success", `Delete star successful`);
      }
    })
    .catch(() => {
      callback(STATUS_RESPONSE_CODE.ERROR);
      showNotification("error", `Delete star error`);
    });
};
