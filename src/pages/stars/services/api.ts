/* eslint-disable @typescript-eslint/no-explicit-any */
import Axios, { AxiosResponse, CancelTokenSource } from "axios";
import { HistoryDefaultDetail } from "components/History/types";
import { showNotification } from "helpers/util";
import { STATUS_RESPONSE_CODE } from "types";
import {
  ParamsStarHistoryRequest,
  ParamsStarRequest,
  RequestPostNewStarProp,
  SetMintPriceBody,
  StarDetail,
  StarInfo,
} from "../types";
// eslint-disable-next-line
export const getSystemStarMiddleware = async (
  params: ParamsStarRequest,
  source?: CancelTokenSource
) => {
  const response: AxiosResponse<{
    data: {
      items: StarDetail[];
      total: number;
    };
  }> = await Axios.get(`/api/system/star`, {
    params,
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
  Axios.put(`/api/system/star/${idStar}/status`, request)
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
  idStar: string,
  request: {
    name: string;
  },
  callBack: (status: STATUS_RESPONSE_CODE) => void
) => {
  Axios.put(`/api/system/star/${idStar}/register/name`, request)
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
  idStar: string,
  request: {
    image: any;
  },
  callBack: (status: STATUS_RESPONSE_CODE, dataRes?: StarDetail) => void
) => {
  const formData = new FormData();
  if (request.image) {
    formData.append("image", request.image);
  }
  formData.append("_method", "PUT");
  Axios.put(`/api/system/star/${idStar}/image`, formData)
    .then((response: any) => {
      if (response.data.statusCode === STATUS_RESPONSE_CODE.SUCCESS) {
        showNotification("success", "Update image star successfully!");
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
export const updateImagePreviewStarMiddleware = (
  idStar: string,
  request: {
    imagePreview: any;
  },
  callBack: (status: STATUS_RESPONSE_CODE, dataRes?: StarDetail) => void
) => {
  const formData = new FormData();
  if (request.imagePreview) {
    formData.append("imagePreview", request.imagePreview);
  }
  formData.append("_method", "PUT");
  Axios.put(`/api/system/star/${idStar}/image-preview`, formData)
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

// eslint-disable-next-line
export const updateBIOStarMiddleware = (
  idStar: string,
  request: {
    bio: string;
  },
  callBack: (status: STATUS_RESPONSE_CODE, dataRes?: StarInfo) => void
) => {
  Axios.put(`/api/system/star/${idStar}/bio`, request)
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
  }> = await Axios.get(`/api/history-owner/Star/${idNft}`, {
    params,
  });

  return response.data.data;
};
// eslint-disable-next-line
export const setMintPriceStarMiddleware = async (
  body: SetMintPriceBody[],
  callback: (status: STATUS_RESPONSE_CODE) => void
) => {
  Axios.post("/api/system/star/set-mint-price", body)
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
export const lockStarMiddleware = (
  id: string,
  locked: boolean,
  callback: (status: STATUS_RESPONSE_CODE) => void
) => {
  Axios.put(`/api/system/star/${id}/locked`, {
    locked,
  })
    .then((res: any) => {
      if (res.data?.statusCode >= 400) {
        callback(STATUS_RESPONSE_CODE.ERROR);
        showNotification(
          "error",
          res.data.message || `Fail to ${locked ? "lock" : "unlock"} star`
        );
      } else {
        callback(STATUS_RESPONSE_CODE.SUCCESS);
        showNotification(
          "success",
          `${locked ? "Lock" : "Unlock"} star successfully`
        );
      }
    })
    .catch(() => {
      callback(STATUS_RESPONSE_CODE.ERROR);
      showNotification("error", `Fail to ${locked ? "lock" : "unlock"} star`);
    });
};

// eslint-disable-next-line
export const postNewStar = (
  request: RequestPostNewStarProp,
  onSuccess: () => void,
  onError: () => void
) => {
  Axios.post(`/api/system/star`, request)
    .then((res: any) => {
      if (res.data?.statusCode >= 400) {
        onError();
        showNotification("error", res.data.message || `Add new star error`);
      } else {
        onSuccess();
        showNotification("success", `Add new star successful`);
      }
    })
    .catch(() => {
      onError();
      showNotification("error", `Add new star error`);
    });
};

export const updateStar = (
  id: string,
  request: RequestPostNewStarProp,
  onSuccess: () => void,
  onError: () => void
) => {
  Axios.patch(`/api/system/star/${id}`, request)
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

// export const updateFamousStarMiddleware = (
//   id: string,
//   onSuccess: () => void,
//   onError: () => void
// ) => {
//   Axios.patch(`/api/system/star/famous/${id}`)
//     .then((res: any) => {
//       if (res.data?.statusCode >= 400) {
//         onError();
//         showNotification("error", res.data.message || `Update famous error`);
//       } else { 
//         onSuccess();
//         showNotification("success", `Update famous successful`);
//       }
//     })
//     .catch(() => {
//       onError();
//       showNotification("error", `Update famous error`);
//     });
// };

export const updateFamousStarMiddleware = (
  id: string,
  callback: (status: STATUS_RESPONSE_CODE) => void
) => {
  Axios.patch(`/api/system/star/famous/${id}`)
    .then((res: any) => {
      if (res.data?.statusCode >= 400) {
        callback(STATUS_RESPONSE_CODE.ERROR);
        showNotification(
          "error",
          res.data.message || `Fail to update famous star`
        );
      } else {
        callback(STATUS_RESPONSE_CODE.SUCCESS);
        showNotification(
          "success",
          `Update famous star successfully`
        );
      }
    })
    .catch(() => {
      callback(STATUS_RESPONSE_CODE.ERROR);
      showNotification("error", `Fail to update famous star`);
    });
};

export const deleteStar = (
  id: string,
  callback: (status: STATUS_RESPONSE_CODE) => void
) => {
  Axios.delete(`/api/system/star/${id}`)
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
