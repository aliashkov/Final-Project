import { legacy_createStore, combineReducers } from 'redux'
import { authReducer } from '../reducers/authReducer'
import { friendsReducer } from '../reducers/friendsReducer'
import { userReducer } from '../reducers/userReducer'
import { isAllPostsReducer } from '../reducers/isAllPostsReducer'
import { findPostsReducer } from '../reducers/findPostsReducer'

const rootReducer = combineReducers({
    authReducer,
    friendsReducer,
    userReducer,
    isAllPostsReducer,
    findPostsReducer,
})



export const store = legacy_createStore(rootReducer)