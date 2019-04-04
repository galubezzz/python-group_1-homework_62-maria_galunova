import axios from "axios";
import {MOVIES_URL} from "../../api-urls";

export const MOVIE_DELETE_REQUEST = "MOVIE_DELETE_REQUEST";
export const MOVIE_DELETE_SUCCESS = "MOVIE_DELETE_SUCCESS";
export const MOVIE_DELETE_ERROR = "MOVIE_DELETE_ERROR";


export const deleteMovie = (movie_id, authToken) => {
    console.log(authToken,'TOKEN_DELETE');
    return dispatch => {
        const url = MOVIES_URL + movie_id + '/';
        const options = {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': 'Token ' + authToken
            }
        };

        dispatch({type: MOVIE_DELETE_REQUEST});
        // не забываем возвращать результаты,
        // чтобы в HallEdit после успешной загрузки сделать редирект
        return axios.delete(url, options).then(response => {
            console.log(response);
            // и здесь
            return dispatch({type: MOVIE_DELETE_SUCCESS})
        }).catch(error => {
            console.log(error);
            console.log(error.response);
            // и здесь
            return dispatch({type: MOVIE_DELETE_ERROR, errors: error.response.data});
        });
    }
};