import {combineReducers} from 'redux';
import loginReducer from "./login";
import authReducer from "./auth";

const rootReducer = combineReducers({
    login: loginReducer,
    auth: authReducer,
});

export default rootReducer;