import { legacy_createStore, combineReducers } from 'redux'
import { authReducer } from '../reducers/authReducer'
import { friendsReducer } from '../reducers/friendsReducer'
import { userReducer } from '../reducers/userReducer'

const rootReducer = combineReducers({
    authReducer,
    friendsReducer,
    userReducer
})



export const store = legacy_createStore(rootReducer)