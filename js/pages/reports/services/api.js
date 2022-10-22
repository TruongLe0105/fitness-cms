import Axios from "axios";
// eslint-disable-next-line
export const getReportMiddleware = async (params, source) => {
    const response = await Axios.get(`/api/reports`, {
        params,
        cancelToken: source && source.token,
    });
    return response.data.data;
};
