import React, {Fragment, Component} from 'react'
import {NavLink} from "react-router-dom";
import axios from 'axios';
import AccountForm from "../../components/AccountForm/AccountForm";


const USERS_URL = 'http://localhost:8000/api/v1/users/username/';

class Account extends Component {
    state = {
        user: [],
        flag: false,
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

    showForm(){
        let newflag = !this.state.flag;
        this.setState({flag: newflag});
    }

    render() {
        return <Fragment>
            <div>
                <p>Имя пользователя: {this.state.user.username}</p>
                <p>Имя: {this.state.user.first_name}</p>
                <p>Фамилия: {this.state.user.last_name}</p>
                <p>Email: {this.state.user.email}</p>
                <button onClick={()=>this.showForm()}>Редактировать</button>
                {this.state.flag && <AccountForm user={this.state.user}/>}
            </div>
        </Fragment>
    }
}


export default Account;