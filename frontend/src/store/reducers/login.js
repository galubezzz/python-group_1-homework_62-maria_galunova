import {LOGIN_ERROR, LOGIN_REQUEST, LOGIN_SUCCESS} from "../actions/login";

const initialState = {
    loading: false,
    errors: {}
};


const loginReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_REQUEST:
            return {
                ...state,
                errors: {},
                loading: true
            };
        case LOGIN_SUCCESS:
            return {
                ...state,
                loading: false
            };
        case LOGIN_ERROR:
            return {
                ...state,
                loading: false,
                errors: action.errors
            };
        default:
            return state;
    }
};

export default loginReducer;