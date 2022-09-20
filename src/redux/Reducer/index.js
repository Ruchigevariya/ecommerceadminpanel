import { combineReducers } from "redux";
import { categoryReducer } from "./Category.reducer";
import { counterReducer } from "./Counter.reducer";
import { productReducer } from "./Product.reducer";

export const rootReducer = combineReducers ({
    counter: counterReducer,
    Product: productReducer,
    category: categoryReducer
})