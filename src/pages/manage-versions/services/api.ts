import axios, { AxiosResponse } from "axios";
import { showNotification } from "helpers/util";
import { ListResponse, ParamsRequest } from "interfaces";
import { STATUS_RESPONSE_CODE } from "types";
import { ManageVersion } from "../interfaces";

const baseURL = "/api/manage-versions";

export const getListVersionsMiddleware = async (
  params: ParamsRequest
): Promise<ListResponse<ManageVersion>["data"]> => {
  const response: AxiosResponse<ListResponse<ManageVersion>> = await axios.get(
    baseURL,
    {
      params,
    }
  );
  return response.data.data;
};

export const getVersionMiddleware = async (
  id: ManageVersion["id"]
): Promise<ListResponse<ManageVersion>["data"]> => {
  const response: AxiosResponse<ListResponse<ManageVersion>> = await axios.get(
    `${baseURL}/${id}`
  );
  return response.data.data;
};

export const createVersionMiddleware = async (
  body: ManageVersion,
  callBack: (status: STATUS_RESPONSE_CODE) => void
): Promise<void> => {
  axios
    .post(`${baseURL}`, body)
    .then((response: any) => {
      if (response.data?.statusCode >= 400) {
        console.log("response.data", response.data);
        callBack(STATUS_RESPONSE_CODE.ERROR);
        showNotification("error", response.data.message || `Add version error`);
      } else {
        showNotification("success", "Add version successfully!");
        callBack(STATUS_RESPONSE_CODE.SUCCESS);
      }
    })
    .catch(() => {
      callBack(STATUS_RESPONSE_CODE.ERROR);
      showNotification("error", `Add version error`);
    });
};

export const updateVersionMiddleware = async (
  id: ManageVersion["id"],
  body: ManageVersion,
  callBack: (status: STATUS_RESPONSE_CODE) => void
): Promise<void> => {
  axios
    .patch(`${baseURL}/${id}`, body)
    .then((response: any) => {
      if (response.data?.statusCode >= 400) {
        callBack(STATUS_RESPONSE_CODE.ERROR);
        showNotification(
          "error",
          response.data.message || `Update version error`
        );
      } else {
        showNotification("success", "Update version successfully!");
        callBack(STATUS_RESPONSE_CODE.SUCCESS);
      }
    })
    .catch(() => {
      callBack(STATUS_RESPONSE_CODE.ERROR);
      showNotification("error", `Update version error`);
    });
};

export const deleteVersionMiddleware = async (
  id: ManageVersion["id"],
  callBack: (status: STATUS_RESPONSE_CODE) => void
): Promise<void> => {
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
