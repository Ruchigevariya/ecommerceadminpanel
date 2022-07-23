import * as ActionTypes from '../ActionTypes';

const initVal = {
    counter: 0
}

export const counterReducer = (state = initVal, action) => {
    switch (action.type) {
        case ActionTypes.INCREAMENT_COUNTER:
            return {
                ...state,
                counter: state.counter + 1
            }
        case ActionTypes.DECREAMENT_COUNTER:
            return {
                ...state,
                counter: state.counter - 1
            }
            default:
                return state
    }
}
