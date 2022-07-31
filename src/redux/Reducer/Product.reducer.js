import * as ActionTypes from '../ActionTypes'

const initVal = {
    isLoading: false,
    Product: [],
    error:''
}

export const productReducer = (state = initVal, action) => {
    switch(action.type) {
        case ActionTypes.GET_PRODUCTDATA:
            return{
                ...state,
                isLoading: false,
                Product: action.payload,
                error: ''
            }
            default:
                return state;
    }
}