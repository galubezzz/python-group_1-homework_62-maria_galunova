import axios, {HALLS_URL} from "../../api-urls";


export const HALL_LIST_REQUEST_SUCCESS = "HALL_LIST_REQUEST_SUCCESS";


export const loadHalls = () => {
    return dispatch => {
        axios.get(HALLS_URL)
            .then(response => {
                console.log(response.data);
                return dispatch({type: HALL_LIST_REQUEST_SUCCESS, halls: response.data});
            })
            .catch(error => console.log(error));
    }
};