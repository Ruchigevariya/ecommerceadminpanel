import * as ActionTypes from '../ActionTypes'

const initVal = {
    isLoading: false,
    Product: [],
    error: ''
}

export const productReducer = (state = initVal, action) => {
    switch (action.type) {
        case ActionTypes.GET_PRODUCTDATA:
            return {
                ...state,
                isLoading: false,
                Product: action.payload,
                error: ''
            }
        case ActionTypes.LOADING_PRODUCT:
            return {
                ...state,
                isLoading: true,
                error: ''
            }
        case ActionTypes.ERROR_PRODUCT:
            return {
                ...state,
                isLoading: false,
                Product: [],
                error: action.payload,
            }

        default:
            return state;
    }
}