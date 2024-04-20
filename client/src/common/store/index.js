import { authreducer as auth } from "../reducer/authReducer";
import { allUserReducer as allUsers } from "../reducer/allUserReducer";
import { createStore, combineReducers, applyMiddleware } from "redux";
import {thunk} from 'redux-thunk';

const reducers = combineReducers({
    auth,
    allUsers
})

let middleware = [thunk];

export default createStore(reducers, {}, applyMiddleware(...middleware));