import React from 'react'
import {Redirect, Route} from 'react-router'

// для передачи данных из state в AuthRoute его нужно завернуть в коннектор.
import {connect} from "react-redux";


const AuthRoute = (props) => {
    if(props.app.loading) {
        return <p>Loading, please wait.</p>
    }
    if(props.auth.user_id) {
        return <Route {...props} />
    }
    return <Redirect to={{
        pathname: "/login",
        state: {next: props.location}
    }}/>
};


// вытаскиваем данные об аутентификации из state
const mapStateToProps = state => ({auth: state.auth, app: state.app});
// никаких дополнительных действий здесь не нужно
const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(AuthRoute);