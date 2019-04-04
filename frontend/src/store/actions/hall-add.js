import axios from "axios";
import {HALLS_URL} from "../../api-urls";

export const HALL_ADD_REQUEST = "HALL_ADD_REQUEST";
export const HALL_ADD_SUCCESS = "HALL_ADD_SUCCESS";
export const HALL_ADD_ERROR = "HALL_ADD_ERROR";

// пока без загрузки категорий для MovieForm
// export const MOVIE_CATEGORIES_LOAD_SUCCESS = "MOVIE_CATEGORIES_LOAD_SUCCESS";

// этот экшн можно переиспользовать в MovieDetail -
// импортировать его прямо туда и добавить обработку этого экшена
// в редьюсер для MovieDetail. Также рекомендуется перенести этот экшен
// в экшены для MovieDetail, т.к. там он более уместен по смыслу.

// этот метод не является экшеном,
// но его использует saveMovie, поэтому он здесь.
const gatherFormData = (hall) => {
    let formData = new FormData();
    Object.keys(hall).forEach(key => {
        const value = hall[key];
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


export const addHall = (hall, authToken) => {
    return dispatch => {
        const formData = gatherFormData(hall);
        const options = {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': 'Token ' + authToken
            }
        };

        dispatch({type: HALL_ADD_REQUEST});
        // не забываем возвращать результаты,
        // чтобы в MovieEdit после успешной загрузки сделать редирект
        return axios.post(HALLS_URL, formData, options).then(response => {
            console.log(response);
            // и здесь
            return dispatch({type: HALL_ADD_SUCCESS, hall: response.data});
        }).catch(error => {
            console.log(error);
            console.log(error.response);
            // и здесь
            return dispatch({type: HALL_ADD_ERROR, errors: error.response.data});
        });
    }
};