import axios from "axios";
import {MOVIES_URL} from "../../api-urls";

export const MOVIE_ADD_REQUEST = "MOVIE_ADD_REQUEST";
export const MOVIE_ADD_SUCCESS = "MOVIE_ADD_SUCCESS";
export const MOVIE_ADD_ERROR = "MOVIE_ADD_ERROR";


// пока без загрузки категорий для MovieForm
// export const MOVIE_CATEGORIES_LOAD_SUCCESS = "MOVIE_CATEGORIES_LOAD_SUCCESS";


// этот метод не является экшеном,
// но его использует saveMovie, поэтому он здесь.
const gatherFormData = (movie) => {
    let formData = new FormData();
    Object.keys(movie).forEach(key => {
        const value = movie[key];
        if (value) {
            if (Array.isArray(value)) {
                value.forEach(item => formData.append(key, item));
            } else {
                formData.append(key, value);
            }
        }
    });
    return formData;
};


export const saveMovie = (movie, authToken) => {
    return dispatch => {
        const formData = gatherFormData(movie);
        const options = {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': 'Token ' + authToken
            }
        };

        dispatch({type: MOVIE_ADD_REQUEST});
        // не забываем возвращать результаты,
        // чтобы в MovieEdit после успешной загрузки сделать редирект
        return axios.post(MOVIES_URL, formData, options).then(response => {
            console.log(response);
            // и здесь
            return dispatch({type: MOVIE_ADD_SUCCESS, movie: response.data});
        }).catch(error => {
            console.log(error);
            console.log(error.response);
            // и здесь
            return dispatch({type: MOVIE_ADD_ERROR, errors: error.response.data});
        });
    }
};