import {MOVIE_DELETE_ERROR, MOVIE_DELETE_REQUEST, MOVIE_DELETE_SUCCESS} from "../actions/movie-delete";

const initialState = {
    movie: null,
    errors: {}
};

const movieDeleteReducer = (state = initialState, action) => {
    switch (action.type) {
        case MOVIE_DELETE_REQUEST:
            return {...state, errors: {}};
        case MOVIE_DELETE_SUCCESS:
            return {...state, movie: action.movie};
        case MOVIE_DELETE_ERROR:
            return {...state, errors: action.errors};
        default:
            return state
    }
};


export default movieDeleteReducer;