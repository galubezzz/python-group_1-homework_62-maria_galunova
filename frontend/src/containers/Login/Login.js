import React, {Component, Fragment} from 'react';
import {login, LOGIN_SUCCESS} from '../../store/actions/login'
import {connect} from "react-redux";

class Login extends Component {
    state = {
        credentials: {
            username: "",
            password: ""
        }
    };

    redirect = () => {
        const {location, history} = this.props;
        if (location.state) {
            history.replace(location.state.next);
        } else {
            history.goBack();
        }
    };

    formSubmitted = (event) => {
        event.preventDefault();
        const {username, password} = this.state.credentials;
        // один из вариантов редиректа - вернуть результат запроса
        // из action-creator'а login(). Результатом будет action, обёрнутый в Promise,
        // поэтому у него можно вызвать метод then, в котором проверить тип action'а,
        // и если вход успешен (тип action'а - LOGIN_SUCCESS),
        // то перенаправить пользователя на другую страницу.
        // смотрите также комментарий к login() в actions/login.js.
        this.props.login(username, password).then((result) => {
            if(result.type === LOGIN_SUCCESS) this.redirect();
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
        if(this.props.errors && this.props.errors[name]) {
            return this.props.errors[name].map((error, index) => <p className="text-danger" key={index}>{error}</p>);
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
                <button disabled={this.props.loading} type="submit" className="btn btn-primary mt-2">Войти</button>
            </form>
        </Fragment>
    }
}


const mapStateToProps = state => state.login;

const mapDispatchToProps = dispatch => ({
    login: (username, password) => dispatch(login(username, password))
});


export default connect(mapStateToProps, mapDispatchToProps)(Login);