import {HALL_LIST_REQUEST_SUCCESS} from "../actions/halls";

const initialState = {
    halls: [],
};

const hallsReducer = (state = initialState, action) => {
    switch (action.type) {
        case HALL_LIST_REQUEST_SUCCESS:
            return {...state, halls: action.halls};
        default:
            return state;
    }
};

export default hallsReducer;