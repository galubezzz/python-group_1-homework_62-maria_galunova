import {combineReducers} from 'redux';
import loginReducer from "./login";
import authReducer from "./auth";
import movieListReducer from "./movie-list";
import hallsReducer from "./halls"
import movieEditReducer from "./movie-edit";
import hallEditReducer from "./hall-edit";

const rootReducer = combineReducers({
    login: loginReducer,
    auth: authReducer,
    movies: movieListReducer,
    halls: hallsReducer,
    movieEdit: movieEditReducer,
    hallEdit: hallEditReducer,
});

export default rootReducer;