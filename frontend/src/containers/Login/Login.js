import React, {Component, Fragment} from 'react';
import {LOGIN_URL} from "../../api-urls";
import axios from 'axios';


class Login extends Component {
    state = {
        credentials: {
            username: "",
            password: ""
        },
        errors: {}
    };

    formSubmitted = (event) => {
        event.preventDefault();
        return axios.post(LOGIN_URL, this.state.credentials).then(response => {
            console.log(response);
            localStorage.setItem('auth-token', response.data.token);
            if (this.props.location.state) {
                this.props.history.replace(this.props.location.state.next);
            } else {
                this.props.history.goBack();
            }
        }).catch(error => {
            console.log(error);
            console.log(error.response);
            this.setState({
                ...this.state,
                errors: error.response.data
            })
        });
    };

    inputChanged = (event) => {
        this.setState({
            ...this.state,
            credentials: {
                ...this.state.credentials,
                [event.target.name]: event.target.value
            }
        })
    };

    showErrors = (name) => {
        if(this.state.errors && this.state.errors[name]) {
            return this.state.errors[name].map((error, index) => <p className="text-danger" key={index}>{error}</p>);
        }
        return null;
    };

    render() {
        const {username, password} = this.state.credentials;
        return <Fragment>
            <h2>Вход</h2>
            <form onSubmit={this.formSubmitted}>
                {this.showErrors('non_field_errors')}
                <div className="form-row">
                    <label className="font-weight-bold">Имя пользователя</label>
                    <input type="text" className="form-control" name="username" value={username}
                           onChange={this.inputChanged}/>
                    {this.showErrors('username')}
                </div>
                <div className="form-row">
                    <label className="font-weight-bold">Пароль</label>
                    <input type="password" className="form-control" name="password" value={password}
                           onChange={this.inputChanged}/>
                    {this.showErrors('password')}
                </div>
                <button type="submit" className="btn btn-primary mt-2">Войти</button>
            </form>
        </Fragment>
    }
}


export default Login;