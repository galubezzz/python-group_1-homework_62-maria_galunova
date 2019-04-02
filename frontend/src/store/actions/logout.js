export const LOGOUT = "LOGOUT";

// с выходом всё проще, т.к. он не делает запросов.
export const logout = () => {
    return dispatch => {
        localStorage.removeItem('auth-token')
        localStorage.removeItem('username');
        dispatch({type: LOGOUT});
    };
};