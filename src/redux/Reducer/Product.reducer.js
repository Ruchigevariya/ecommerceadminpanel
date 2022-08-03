import * as ActionTypes from '../ActionTypes'

const initVal = {
    isLoading: false,
    Product: [],
    error: ''
}

export const productReducer = (state = initVal, action) => {
    console.log(action.type, action.payload);
    switch (action.type) {
        case ActionTypes.GET_PRODUCTDATA:
            return {
                ...state,
                isLoading: false,
                Product: action.payload,
                error: ''
            }
        case ActionTypes.ADD_PRODUCTDATA:
            return {
                ...state,
                isLoading: false,
                Product: state.Product.concat(action.payload),
                error: ''
            }
        case ActionTypes.DELETE_PRODUCTDATA:
            return {
                ...state,
                isLoading: false,
                Product: state.Product.filter((p) => p.id !== action.payload),
                error: ''
            }
        case ActionTypes.UPDATE_PRODUCTDATA:
            return {
                ...state,
                isLoading: false,
                Product: state.Product.map((p) =>{
                    if(p.id === action.payload.id){
                        return action.payload;
                    }else{
                        return p;
                    }
                }),
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