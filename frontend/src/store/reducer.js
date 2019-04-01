const initialState = {
    login: {
        loading: false,
        errors: {}
    },
    auth: {},
    app: {
        loading: true,
        errors: {}
    },
    register: {},
    movieList: {},
    movieDetail: {},
    movieAdd: {},
    movieEdit: {}
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        default:
            return state;
    }
};

export default reducer;