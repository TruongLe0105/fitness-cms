import Axios from "axios";
// eslint-disable-next-line
export const getUserMobileMiddleware = async (params, source) => {
    const response = await Axios.get(`/api/users`, {
        params,
        cancelToken: source && source.token,
    });
    return response.data.data;
};
// eslint-disable-next-line
export const getUserProfileMiddleware = async (idUser) => {
    const response = await Axios.get(`/api/users/${idUser}/user-profile`);
    return response.data.data;
};
