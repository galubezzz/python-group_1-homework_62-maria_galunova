import {MOVIE_LIST_REQUEST_SUCCESS} from "../actions/movie-list";

const initialState = {
    movies: [],
};

const movieListReducer = (state = initialState, action) => {
    switch (action.type) {
        case MOVIE_LIST_REQUEST_SUCCESS:
            return {...state, movies: action.movies};
        default:
            return state;
    }
};

export default movieListReducer;