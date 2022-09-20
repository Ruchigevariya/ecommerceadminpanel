import * as ActionTypes from '../ActionTypes'

const initVal = {
    isLoading: false,
    category: [],
    error: ''
}

export const categoryReducer = (state = initVal, action) => {
    console.log(action.type, action.payload);
    switch (action.type) {
        case ActionTypes.ADD_CATEGORYDATA:
            return {
                ...state,
                isLoading: false,
                category: state.category.concat(action.payload),
                error: ''
            }
        case ActionTypes.GET_CATEGORYDATA:
            return {
                ...state,
                isLoading: false,
                category: action.payload,
                error: ''
            }
        case ActionTypes.DELETE_CATEGORYDATA:
            return {
                ...state,
                isLoading: false,
                category: state.category.filter((c) => c.id !== action.payload),
                error: ''
            }
            case ActionTypes.UPDATE_CATEGORYDATA:
                return {
                    ...state,
                    isLoading: false,
                    category: state.category.map((c) =>{
                        if(c.id === action.payload.id){
                            return action.payload;
                        }else{
                            return c;
                        }
                    }),
                    error: ''
                }
        case ActionTypes.ERROR_CATEGORY:
            return {
                ...state,
                isLoading: false,
                category: [],
                error: action.payload,
            }
        default:
            return state;
    }
}