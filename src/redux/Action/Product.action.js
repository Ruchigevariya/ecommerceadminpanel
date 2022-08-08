import { getProductData } from '../../Common/Apis/Product.api';
import { baseUrl } from '../../Shares/BaseURL';
import * as ActionTypes from '../ActionTypes'

export const getProduct = () => (dispatch) => {
    try {
        dispatch(loadingProduct())

        setTimeout(function () {
            getProductData()
            .then((data) => dispatch(({ type: ActionTypes.GET_PRODUCTDATA, payload: data.data })))
                .catch(error => dispatch(errorProduct(error.message)));
            // fetch(baseUrl + 'product')
            //     .then(response => {
            //         if (response.ok) {
            //             return response;
            //         } else {
            //             var error = new Error('Error ' + response.status + ': ' + response.statusText);
            //             error.response = response;
            //             throw error;
            //         }
            //     },
            //         error => {
            //             var errmess = new Error(error.message);
            //             throw errmess;
            //         })
            //     .then(response => response.json())
            //     .then((data) => dispatch(({ type: ActionTypes.GET_PRODUCTDATA, payload: data })))
            //     .catch(error => dispatch(errorProduct(error.message)));
        }, 2000)

    } catch (error) {
        dispatch(errorProduct(error.message))
    }

}

export const addProduct = (data) => (dispatch) => {
    try {
        fetch(baseUrl + 'product', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then(response => {
                if (response.ok) {
                    return response;
                } else {
                    var error = new Error('Error ' + response.status + ': ' + response.statusText);
                    error.response = response;
                    throw error;
                }
            },
                error => {
                    var errmess = new Error(error.message);
                    throw errmess;
                })
            .then((response) => response.json())
            .then((data) => {
                dispatch({ type: ActionTypes.ADD_PRODUCTDATA, payload: data })
            })
            .catch((error) => {
                dispatch(errorProduct(error.message))
            });
    } catch (error) {
        dispatch(errorProduct(error.message))
    }
}

export const deleteProductData = (id) => (dispatch) => {
    try{
        fetch(baseUrl + 'product/' + id , {
            method:'DELETE'
        })
        .then(response => {
            if (response.ok) {
                return response;
            } else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
            error => {
                var errmess = new Error(error.message);
                throw errmess;
            })
        .then((response) => response.json())
        .then(
            dispatch({ type: ActionTypes.DELETE_PRODUCTDATA, payload: id })
        )
        .catch((error) => {
            dispatch(errorProduct(error.message))
        });
    } catch (error) {
        dispatch(errorProduct(error.message))
    }
}

export const updateProductData = (data) => (dispatch) => {
    try{
        fetch(baseUrl + 'product/' + data.id , {
            method:'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        .then(response => {
            if (response.ok) {
                return response;
            } else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
            error => {
                var errmess = new Error(error.message);
                throw errmess;
            })
        .then((response) => response.json())
        .then((data) => {
            dispatch({ type: ActionTypes.UPDATE_PRODUCTDATA, payload: data })
        })
        .catch((error) => {
            dispatch(errorProduct(error.message))
        });
    } catch(error) {
        dispatch(errorProduct(error.message))
    }
}
export const loadingProduct = () => (dispatch) => {
    dispatch({ type: ActionTypes.LOADING_PRODUCT })
}

export const errorProduct = (error) => (dispatch) => {
    dispatch({ type: ActionTypes.ERROR_PRODUCT, payload: error })
}