import { getRequest } from "../Request"

export const getProductData = () => {
    return getRequest('product')
}