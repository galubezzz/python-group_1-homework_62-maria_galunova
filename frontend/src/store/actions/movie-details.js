import axios from "axios";
import {MOVIES_URL, SHOW_URL} from "../../api-urls";
import {HALL_LOAD_ERROR} from "./hall-details";


export const MOVIE_LOAD_SUCCESS = "MOVIE_LOAD_SUCCESS"
export const MOVIE_LOAD_ERROR = "MOVIE_LOAD_ERROR";
export const SHOW_LOAD_SUCCESS = "SHOW_LOAD_SUCCESS";
export const SHOW_LOAD_ERROR = "SHOW_LOAD_ERROR";

// пока без загрузки категорий для MovieForm
// export const MOVIE_CATEGORIES_LOAD_SUCCESS = "MOVIE_CATEGORIES_LOAD_SUCCESS";

// этот экшн можно переиспользовать в MovieDetail -
// импортировать его прямо туда и добавить обработку этого экшена
// в редьюсер для MovieDetail. Также рекомендуется перенести этот экшен
// в экшены для MovieDetail, т.к. там он более уместен по смыслу.
export const loadMovie = (id) => {
    return dispatch => {
        axios.get(MOVIES_URL + id).then(response => {
            console.log(response.data);
            return dispatch({type: MOVIE_LOAD_SUCCESS, movie: response.data});
        }).catch(error => {
            console.log(error);
            console.log(error.response);
            return dispatch({type: MOVIE_LOAD_ERROR, errors: error});
        });
    }
};

export const loadShows = (id) => {

    let current_date = new Date();
    current_date = current_date.toISOString().slice(0, 10);
    console.log(current_date, 'current_date');

    let next_date = new Date();
    next_date.setDate(next_date.getDate() + 3);
    next_date = next_date.toISOString().slice(0, 10);
    console.log(next_date, 'next_date');

    return dispatch => {
        axios.get(SHOW_URL + '?hall_id=' + id + '&min_start_date=' + current_date + '&max_start_date=' + next_date)
            .then(response => {
                console.log(response.data);
                return dispatch({type: SHOW_LOAD_SUCCESS, shows: response.data});
            }).catch(error => {
                console.log(error);
                console.log(error.response);
                return dispatch({type: SHOW_LOAD_ERROR, errors: error});
        });
    }
};