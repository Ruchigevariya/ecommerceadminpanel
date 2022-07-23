import * as ActionTypes from '../ActionTypes';

export const increment = () => (dispatch) => {
    dispatch({type : ActionTypes.INCREAMENT_COUNTER})
}

export const decrement = () => (dispatch) => {
    dispatch({type : ActionTypes.DECREAMENT_COUNTER})
}