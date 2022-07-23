import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { rootReducer } from './Reducer'

export const configureStore = () => {
    let store = createStore(rootReducer, applyMiddleware(thunk))
}