import {LOGIN_SUCCESS} from "../actions/login";
import {LOGOUT} from "../actions/logout";
import {TOKEN_LOGIN_SUCCESS} from "../actions/token-login";

const initialState = {};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return action.data;
        case LOGOUT:
            return {};
        case TOKEN_LOGIN_SUCCESS:
            return action.data;
        default:
            return state;
    }
};


export default authReducer;