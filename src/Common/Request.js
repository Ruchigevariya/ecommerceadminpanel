import axios from 'axios';
import { baseUrl } from "../Shares/BaseURL";

const axiosInstance = axios.create({
    baseURL: baseUrl,
    timeout: 1000,
});

export const sendRequest = (config) => {
    return axiosInstance(config)
}

export const getRequest = (path) => {
    return sendRequest({
        method:'GET',
        url:path
    })
}