import { combineReducers } from "redux";
import { counterReducer } from "./Counter.reducer";
import { productReducer } from "./Product.reducer";

export const rootReducer = combineReducers ({
    counter: counterReducer,
    product: productReducer
})