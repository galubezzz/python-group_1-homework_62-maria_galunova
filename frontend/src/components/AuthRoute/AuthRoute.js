import React from 'react'
import {Redirect, Route} from 'react-router'

const AuthRoute = (props) => {
    if(localStorage.getItem('auth-token')) {
        return <Route {...props} />
    } else {
        return <Redirect to={{
            pathname: "/login",
            state: {next: props.path}
        }}/>
    }
};

export default AuthRoute;
