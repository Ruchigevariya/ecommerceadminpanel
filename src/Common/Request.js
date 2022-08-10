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

export const postRequest = (path, data) => {
    return sendRequest({
        method:'POST',
        url:path,
        data:JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
        },
    })
}

export const deleteRequest = (path, id) => {
    return sendRequest({
        method:'DELETE',
        url:path + id
    })
}

export const putRequest = (path, data) => {
    return sendRequest({
        method:'PUT',
        url:path + data.id,
        data:JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
        },
    })
}