import { baseUrl } from '../../Shares/BaseURL';
import * as ActionTypes from '../ActionTypes'

export const getProduct = () => (dispatch) => {
    try {
        dispatch(loadingProduct())
        
        setTimeout(function () {
            return fetch(baseUrl + 'product')
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
                .then(response => response.json())
                .then((data) => dispatch(({ type: ActionTypes.GET_PRODUCTDATA, payload: data })))
                .catch(error => dispatch(errorProduct(error.message)));
        }, 2000)

    } catch (error) {
        console.log(error);
    }

}

export const loadingProduct = () => (dispatch) => {
    dispatch({ type: ActionTypes.LOADING_PRODUCT })
}

export const errorProduct = (error) => (dispatch) => {
    dispatch({ type: ActionTypes.ERROR_PRODUCT, payload: error })
}