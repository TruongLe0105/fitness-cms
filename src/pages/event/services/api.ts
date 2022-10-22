import Axios, { AxiosResponse, CancelTokenSource } from "axios";
import { showNotification } from "helpers/util";
import { STATUS_RESPONSE_CODE } from "types";
import { EventDetail, ParamsRequest } from "../types";
// eslint-disable-next-line
export const getEventsMiddleware = async (
  params: ParamsRequest,
  source?: CancelTokenSource
) => {
  const response: AxiosResponse<{
    data: {
      items: EventDetail[];
      total: number;
    };
  }> = await Axios.get(`/api/events`, {
    params,
    cancelToken: source && source.token,
  });
  return response.data.data;
};

// eslint-disable-next-line
export const addEventMiddleware = (
  request: FormData,
  callBack: (status: STATUS_RESPONSE_CODE) => void
) => {
  Axios.post(`/api/events`, request)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .then((response: any) => {
      if (response.data.statusCode === STATUS_RESPONSE_CODE.SUCCESS) {
        showNotification("success", "Create new event successfully!");
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
export const updateEventMiddleware = (
  idEvent: number,
  request: FormData,
  callBack: (status: STATUS_RESPONSE_CODE, dataRes?: EventDetail) => void
) => {
  Axios.patch(`/api/events/${idEvent}`, request)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .then((response: any) => {
      if (response.data.statusCode === STATUS_RESPONSE_CODE.SUCCESS) {
        showNotification("success", "Update event successfully!");
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
export const putPauseEvent = (
  idEvent: number,
  request: {
    pause: boolean;
  },
  callBack: (status: STATUS_RESPONSE_CODE, dataRes?: EventDetail) => void
) => {
  Axios.put(`/api/events/${idEvent}/pause`, request)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .then((response: any) => {
      if (response.data.statusCode === STATUS_RESPONSE_CODE.SUCCESS) {
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
