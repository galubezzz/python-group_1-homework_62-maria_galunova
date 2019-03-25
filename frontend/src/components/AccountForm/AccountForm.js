import React, {Component} from 'react'
import axios from "axios";

class AccountForm extends Component {


    state = {
        // пользователь, которого мы редактируем
        user: this.props.user,

        // сообщение об ошибке
        alert: null,

        // индикатор отключения кнопки submit, если запрос выполняется
        submitDisabled: false
    };


    // функция, обновляющая поля в this.state.task
    updateUserState = (fieldName, value) => {
        this.setState(prevState => {
            let newState = {...prevState};
            let user = {...prevState.user};
            user[fieldName] = value;
            newState.user = user;
            return newState;
        });
    };
    // обработчик ввода в поля ввода
    inputChanged = (event) => {
        const value = event.target.value;
        const fieldName = event.target.name;
        this.updateUserState(fieldName, value);
    };

    passwordConfirmChange = (event) => {
        this.inputChanged(event);
        const password = this.state.user.password;
        const passwordConfirm = event.target.value;
        const errors = (password === passwordConfirm) ? [] : ['Пароли не совпадают'];
        this.setState({
            errors: {
                ...this.state.errors,
                passwordConfirm: errors
            }
        });
    };


    // обработчик отправки формы
    formSubmitted = (event) => {
        event.preventDefault();

        // блокировка отправки формы на время выполнения запроса
        this.setState(prevState => {
            let newState = {...prevState};
            newState.submitDisabled = true;
            return newState;
        });
        const USERS_URL = 'http://localhost:8000/api/v1/users/';
        const userData = {...this.state.user};
        if (!userData.password) {
            delete userData.password
        }
        axios.patch(USERS_URL + this.state.user.id + '/', userData, {
            headers: {
                'Authorization': 'Token ' + localStorage.getItem('auth-token')
            }
        })
            .then(response => {
                console.log(response.data);
                if (response.status === 200) return response.data;
                throw new Error('User was not updated!');
            })
            // если всё успешно, переходим на просмотр страницы фильма с id,
            // указанным в ответе
            .catch(error => {
                console.log(error);
                this.setState(prevState => {
                    let newState = {...prevState};
                    newState.alert = {type: 'danger', message: `User was not edited!`};
                    newState.submitDisabled = false;
                    return newState;
                });
                this.setState({
                    ...this.state,
                    errors: error.response.data
                });
            });
    };


    showErrors = (name) => {
        if (this.state.errors && this.state.errors[name]) {
            return this.state.errors[name].map((error, index) => <p className="text-danger" key={index}>{error}</p>);
        }
        return null;
    };

    render() {
        const password = null;
        const passwordConfirm = null;
        // распаковка данных фильма, чтобы было удобнее к ним обращаться

        // создание разметки для алерта, если он есть
        let alert = null;
        if (this.state.alert) {
            alert = <div className={"alert alert-" + this.state.alert.type}>{this.state.alert.message}</div>
        }


        return <div>
            {alert}
            <form onSubmit={this.formSubmitted}>
                {this.showErrors('non_field_errors')}
                <div className="form-group">
                    <label className="font-weight-bold">Имя</label>
                    <input type="text" className="form-control" name="first_name" value={this.state.user.first_name}
                           onChange={this.inputChanged}/>
                    {this.showErrors('first_name')}
                </div>
                <div className="form-group">
                    <label className="font-weight-bold">Фамилия</label>
                    <input type="text" className="form-control" name="last_name" value={this.state.user.last_name}
                           onChange={this.inputChanged}/>
                    {this.showErrors('last_name')}
                </div>
                <div className="form-group">
                    <label className="font-weight-bold">Email</label>
                    <input type="text" className="form-control" name="email" value={this.state.user.email}
                           onChange={this.inputChanged}/>
                    {this.showErrors('email')}
                </div>
                <div className="form-row">
                    <label className="font-weight-bold">Пароль</label>
                    <input type="password" className="form-control" name="password" value={password}
                           onChange={this.inputChanged}/>
                    {this.showErrors('password')}
                </div>
                <div className="form-row">
                    <label className="font-weight-bold">Подтверждение пароля</label>
                    <input type="password" className="form-control" name="passwordConfirm" value={passwordConfirm}
                           onChange={this.passwordConfirmChange}/>
                    {this.showErrors('passwordConfirm')}
                </div>
                <button disabled={this.state.submitDisabled} type="submit"
                        className="btn btn-primary">Сохранить
                </button>
            </form>
        </div>;
    };

}

export default AccountForm;