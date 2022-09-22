import { deleteRequest, getRequest, postRequest, putRequest } from "../Request"

export const getProductData = () => {
    return getRequest('product')
}

export const postProductData = (data) => {
    return postRequest('product', data)
}

export const deleteProduct = (id) => {
    return deleteRequest('product/', id)
}

export const putProductData = (data) => {
    return putRequest('product/', data)
}