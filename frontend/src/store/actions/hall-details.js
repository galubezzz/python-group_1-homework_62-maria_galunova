import axios from "axios";
import {HALLS_URL, SHOW_URL} from "../../api-urls";

export const HALL_LOAD_SUCCESS = "HALL_LOAD_SUCCESS";
export const HALL_LOAD_ERROR = "HALL_LOAD_ERROR";
export const SHOW_LOAD_SUCCESS = "SHOW_LOAD_SUCCESS";
export const SHOW_LOAD_ERROR = "SHOW_LOAD_ERROR";

export const loadHall = (id) => {
    return dispatch => {
        axios.get(HALLS_URL + id).then(response => {
            console.log(response.data);
            return dispatch({type: HALL_LOAD_SUCCESS, hall: response.data});
        }).catch(error => {
            console.log(error);
            console.log(error.response);
            return dispatch({type: HALL_LOAD_ERROR, errors: error});
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

