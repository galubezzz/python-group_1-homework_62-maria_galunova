import {HALL_ADD_ERROR, HALL_ADD_REQUEST, HALL_ADD_SUCCESS} from "../actions/hall-add";

const initialState = {
    hall: null,
    errors: {}
};

const hallAddReducer = (state = initialState, action) => {
    switch (action.type) {
        case HALL_ADD_REQUEST:
            return {...state, errors: {}};
        case HALL_ADD_SUCCESS:
            return {...state, hall: action.hall};
        case HALL_ADD_ERROR:
            return {...state, errors: action.errors};
        default:
            return state
    }
};


export default hallAddReducer;