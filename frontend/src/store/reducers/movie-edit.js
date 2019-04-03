import {MOVIE_EDIT_ERROR, MOVIE_EDIT_REQUEST, MOVIE_EDIT_SUCCESS, MOVIE_LOAD_SUCCESS} from "../actions/movie-edit";

const initialState = {
    movie: null,
    errors: {}
};

const movieEditReducer = (state = initialState, action) => {
    switch (action.type) {
        case MOVIE_LOAD_SUCCESS:
            const category = action.movie.category.map(category => category.id);
            const movie = {...action.movie, category};
            return {...state, movie};
        case MOVIE_EDIT_REQUEST:
            return {...state, errors: {}};
        case MOVIE_EDIT_SUCCESS:
            return {...state, movie: action.movie};
        case MOVIE_EDIT_ERROR:
            return {...state, errors: action.errors};
        default:
            return state
    }
};


export default movieEditReducer;