import Axios, { AxiosResponse } from "axios";
import { showNotification } from "helpers/util";
import { STATUS_RESPONSE_CODE } from "types";
import { LegalPageDetail, TYPE_LEGAL } from "../types";
// eslint-disable-next-line
export const getSettingLegalMiddleware = async (name: TYPE_LEGAL) => {
  const response: AxiosResponse<{
    data: LegalPageDetail;
  }> = await Axios.get(`/api/setting/legal/${name}`);
  return response.data.data;
};

// eslint-disable-next-line
export const updateSettingLegalMiddleware = (
  field: TYPE_LEGAL,
  title: string,
  request: {
    value: string;
  },
  callBack: (status: STATUS_RESPONSE_CODE, dataRes?: LegalPageDetail) => void
) => {
  Axios.put(`/api/setting/legal/${field}`, request)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .then((response: any) => {
      if (response.data.statusCode === STATUS_RESPONSE_CODE.SUCCESS) {
        showNotification("success", `Update ${title} successfully!`);
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
