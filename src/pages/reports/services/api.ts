import Axios, { AxiosResponse, CancelTokenSource } from "axios";
import { ParamsReportRequest, ReportDetail } from "../types";

// eslint-disable-next-line
export const getReportMiddleware = async (
  params: ParamsReportRequest,
  source?: CancelTokenSource
) => {
  const response: AxiosResponse<{
    data: ReportDetail[];
  }> = await Axios.get(`/api/reports`, {
    params,
    cancelToken: source && source.token,
  });
  return response.data.data;
};
