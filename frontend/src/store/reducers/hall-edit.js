import {HALL_EDIT_ERROR, HALL_EDIT_SUCCESS, HALL_EDIT_REQUEST, HALL_LOAD_SUCCESS} from "../actions/hall-edit";

const initialState = {
    hall: null,
    errors: {}
};

const hallEditReducer = (state = initialState, action) => {
    switch (action.type) {
        case HALL_LOAD_SUCCESS:
            const hall = {...action.hall};
            return {...state, hall};
        case HALL_EDIT_REQUEST:
            return {...state, errors: {}};
        case HALL_EDIT_SUCCESS:
            return {...state, hall: action.hall};
        case HALL_EDIT_ERROR:
            return {...state, errors: action.errors};
        default:
            return state
    }
};


export default hallEditReducer;