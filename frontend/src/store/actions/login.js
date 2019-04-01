import axios, {LOGIN_URL} from "../../api-urls";

export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_ERROR = "LOGIN_ERROR";

export const loginRequest = () => {
    return {type: LOGIN_REQUEST}
};

export const loginSuccess = (data) => {
    return {type: LOGIN_SUCCESS, data}
};

export const loginError = (errors) => {
    return {type: LOGIN_ERROR, errors}
};

export const login = (username, password) => {
    return dispatch => {
        dispatch(loginRequest());
        // для возможности дальнейшего использования then в месте вызова функции login()
        // результат запроса нужно вернуть: return.
        // результатом будет действие, обёрнутое в Promise
        // (dispatch возвращает переданное действие,
        // а then и catch оборачивают возвращаемые значения в Promise,
        // чтобы можно было дальше их чейнить).
        return axios.post(LOGIN_URL, {username, password}).then(response => {
            console.log(response);
            localStorage.setItem('auth-token', response.data.token);
            // отсюда вернётся действие из loginSuccess()
            return dispatch(loginSuccess(response.data));
        }).catch(error => {
            console.log(error);
            console.log(error.response);
            // либо отсюда вернётся действие из loginError()
            return dispatch(loginError(error.response.data));
        });
    }
};