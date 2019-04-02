import axios, {TOKEN_LOGIN_URL} from "../../api-urls";

export const TOKEN_LOGIN_REQUEST = "TOKEN_LOGIN_REQUEST";
export const TOKEN_LOGIN_SUCCESS = "TOKEN_LOGIN_SUCCESS";
export const TOKEN_LOGIN_ERROR = "TOKEN_LOGIN_ERROR";

export const tokenLoginRequest = () => {
    return {type: TOKEN_LOGIN_REQUEST}
};

export const tokenLoginSuccess = (data) => {
    return {type: TOKEN_LOGIN_SUCCESS, data}
};

export const tokenLoginError = (errors) => {
    return {type: TOKEN_LOGIN_ERROR, errors}
};

export const tokenLogin = () => {
    return dispatch => {
        dispatch(tokenLoginRequest);
        const token = localStorage.getItem('auth-token');
        if(!token) {
            localStorage.removeItem('auth-token');
            dispatch(tokenLoginError({'token': "Token does not exist."}));
        }
        return axios.post(TOKEN_LOGIN_URL, {token}).then(response => {
            console.log(response);
            return dispatch(tokenLoginSuccess(response.data));
        }).catch(error => {
            console.log(error);
            console.log(error.response);
            localStorage.removeItem('auth-token');
            return dispatch(tokenLoginError(error.response.data));
        });
    }
};