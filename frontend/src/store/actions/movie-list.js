import axios, {MOVIES_URL} from "../../api-urls";


export const MOVIE_LIST_REQUEST_SUCCESS = "MOVIE_LIST_REQUEST_SUCCESS";


export const loadMovies = () => {
    return dispatch => {
        axios.get(MOVIES_URL)
            .then(response => {
                console.log(response.data);
                return dispatch({type: MOVIE_LIST_REQUEST_SUCCESS, movies: response.data});
            })
            .catch(error => console.log(error));
    }
};