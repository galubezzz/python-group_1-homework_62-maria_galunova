import axios from "axios";
import {HALLS_URL} from "../../api-urls";

export const HALL_DELETE_REQUEST = "HALL_DELETE_REQUEST";
export const HALL_DELETE_SUCCESS = "HALL_DELETE_SUCCESS";
export const HALL_DELETE_ERROR = "HALL_DELETE_ERROR";


export const deleteHall = (hall_id, authToken) => {
    console.log(authToken,'TOKEN_DELETE');
    return dispatch => {
        const url = HALLS_URL + hall_id + '/';
        const options = {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': 'Token ' + authToken
            }
        };

        dispatch({type: HALL_DELETE_REQUEST});
        // не забываем возвращать результаты,
        // чтобы в HallEdit после успешной загрузки сделать редирект
        return axios.delete(url, options).then(response => {
            console.log(response);
            // и здесь
            return dispatch({type: HALL_DELETE_SUCCESS})
        }).catch(error => {
            console.log(error);
            console.log(error.response);
            // и здесь
            return dispatch({type: HALL_DELETE_ERROR, errors: error.response.data});
        });
    }
};