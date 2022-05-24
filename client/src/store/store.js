import { legacy_createStore, combineReducers, applyMiddleware } from 'redux'
import { authReducer } from '../reducers/authReducer'

const rootReducer = combineReducers({
    authReducer
})



export const store = legacy_createStore(rootReducer)