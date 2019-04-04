import {combineReducers} from 'redux';
import loginReducer from "./login";
import authReducer from "./auth";
import movieListReducer from "./movie-list";
import hallsReducer from "./halls"
import movieEditReducer from "./movie-edit";
import hallEditReducer from "./hall-edit";
import hallDetailReducer from "./hall-details";
import hallDeleteReducer from "./hall-delete";
import hallAddReducer from "./hall-add";

const rootReducer = combineReducers({
    login: loginReducer,
    auth: authReducer,
    movies: movieListReducer,
    halls: hallsReducer,
    movieEdit: movieEditReducer,
    hallEdit: hallEditReducer,
    hallDetails: hallDetailReducer,
    hallDelete: hallDeleteReducer,
    hallAdd: hallAddReducer,
});

export default rootReducer;