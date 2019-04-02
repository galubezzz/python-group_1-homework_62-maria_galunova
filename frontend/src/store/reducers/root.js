import {combineReducers} from 'redux';
import loginReducer from "./login";
import authReducer from "./auth";
import movieListReducer from "./movie-list";

const rootReducer = combineReducers({
    login: loginReducer,
    auth: authReducer,
    movies: movieListReducer,
});

export default rootReducer;