import {LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_ERROR} from "./actions/login";

const initialState = {
    login: {
        loading: false,
        errors: {}
    },
    auth: {},
    app: {
        loading: true,
        errors: {}
    },
    register: {},
    movieList: {},
    movieDetail: {},
    movieAdd: {},
    movieEdit: {}
};

const reducer = (state = initialState, action) => {
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
                login:{
                    loading: false,
                    errors: action.errors
                }
            };
        default:
            return state;
    }
};

export default reducer;