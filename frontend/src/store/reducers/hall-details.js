import {HALL_LOAD_SUCCESS, HALL_LOAD_ERROR} from "../actions/hall-details";
import {SHOW_LOAD_ERROR, SHOW_LOAD_SUCCESS} from "../actions/hall-details";

const initialState = {
    hall: null,
    shows: [],
    errors: {}
};


const hallDetailReducer = (state = initialState, action) => {
    switch (action.type) {
        case HALL_LOAD_SUCCESS:
            return {...state, hall: action.hall};
        case HALL_LOAD_ERROR:
            return {...state, errors: action.errors};
        case SHOW_LOAD_SUCCESS:
            return {...state, shows: action.shows};
        case SHOW_LOAD_ERROR:
            return {...state, errors: action.errors};
        default:
            return state
    }
};


export default hallDetailReducer;