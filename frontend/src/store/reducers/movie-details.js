import {MOVIE_LOAD_SUCCESS, MOVIE_LOAD_ERROR} from "../actions/movie-details";
import {SHOW_LOAD_ERROR, SHOW_LOAD_SUCCESS} from "../actions/hall-details";

const initialState = {
    movie: null,
    shows: [],
    errors: {}
};

const movieDetailsReducer = (state = initialState, action) => {
    switch (action.type) {
        case MOVIE_LOAD_SUCCESS:
            const movie = {...action.movie};
            return {...state, movie};
        case MOVIE_LOAD_ERROR:
            return {...state, errors: action.errors};
        case SHOW_LOAD_SUCCESS:
            return {...state, shows: action.shows};
        case SHOW_LOAD_ERROR:
            return {...state, errors: action.errors};
        default:
            return state
    }
};


export default movieDetailsReducer;