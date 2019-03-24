import React, {Fragment, Component} from 'react'
import {NavLink} from "react-router-dom";
import axios from 'axios';


const USERS_URL = 'http://localhost:8000/api/v1/users/username/';

class Account extends Component {
    state = {
        user: [],
    };

    componentDidMount() {
        this.getMovies();
    }

    getMovies(){
        axios.get(USERS_URL + localStorage.getItem("username"))
            .then(response => {console.log(response.data); return response.data;})
            .then(user => this.setState({user}))
            .catch(error => console.log(error));
    }

    render() {
        return <Fragment>
            <div className='row'>
                {this.state.user.username}
            </div>
        </Fragment>
    }
}


export default Account;