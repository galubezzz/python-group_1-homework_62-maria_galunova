import {HALL_DELETE_REQUEST, HALL_DELETE_SUCCESS, HALL_DELETE_ERROR} from "../actions/hall-delete";

const initialState = {
    hall: null,
    errors: {}
};

const hallDeleteReducer = (state = initialState, action) => {
    switch (action.type) {
        case HALL_DELETE_REQUEST:
            return {...state, errors: {}};
        case HALL_DELETE_SUCCESS:
            return {...state, hall: action.hall};
        case HALL_DELETE_ERROR:
            return {...state, errors: action.errors};
        default:
            return state
    }
};


export default hallDeleteReducer;