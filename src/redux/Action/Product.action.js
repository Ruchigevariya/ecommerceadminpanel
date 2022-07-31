import * as ActionTypes from '../ActionTypes'

export const getProduct = () => (dispatch) => {
    try{
        fetch('http://localhost:3004/product')
        .then((response) => response.json())
        .then((data) => dispatch({type: ActionTypes.GET_PRODUCTDATA, payload: data}));
    }catch (error){  
        console.log(error);
    }
   
}