import Axios, { AxiosResponse } from "axios";
import { showNotification } from "helpers/util";
import { STATUS_RESPONSE_CODE } from "types";
import { LegalPageDetail, TYPE_LEGAL } from "../types";

// eslint-disable-next-line
export const getSettingLegalMiddleware = async (name: TYPE_LEGAL) => {
    const response: AxiosResponse<{
        data: LegalPageDetail;
    }> = await Axios.get(`/configuration/admin/${name}`);
    return response.data.data;
};

// eslint-disable-next-line
export const updateSettingLegalMiddleware = (
    name: TYPE_LEGAL,
    title: string,
    request: {
        name: TYPE_LEGAL,
        value: string;
    },
    callBack: (status: STATUS_RESPONSE_CODE, dataRes?: LegalPageDetail) => void
) => {
    Axios.post(`/configuration/admin/create`, request)
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
