import {MOVIE_ADD_SUCCESS, MOVIE_ADD_REQUEST, MOVIE_ADD_ERROR} from "../actions/movie-add";

const initialState = {
    movie: null,
    errors: {}
};

const movieAddReducer = (state = initialState, action) => {
    switch (action.type) {
        case MOVIE_ADD_REQUEST:
            return {...state, errors: {}};
        case MOVIE_ADD_SUCCESS:
            return {...state, movie: action.movie};
        case MOVIE_ADD_ERROR:
            return {...state, errors: action.errors};
        default:
            return state
    }
};


export default movieAddReducer;