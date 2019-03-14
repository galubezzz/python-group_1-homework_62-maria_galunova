import React, {Component, Fragment} from 'react';
//import {MOVIES_URL} from "../../api-urls";
import axios from 'axios';
import MovieForm from "../../components/MovieForm/MovieForm";

const MOVIES_URL = 'http://localhost:8000/api/v1/movies/';
class MovieAdd extends Component {
    state = {
        // сообщение об ошибке
        alert: null,
    };

    // вывод сообщение об ошибке
    showErrorAlert = (error) => {
        this.setState(prevState => {
            let newState = {...prevState};
            newState.alert = {type: 'danger', message: `Movie was not added!`};
            return newState;
        });
    };

    // сборка данных для запроса
    gatherFormData = (movie) => {
        let formData = new FormData();
        Object.keys(movie).forEach(key => {
            const value = movie[key];
            if (value) {
                if(Array.isArray(value)) {
                    // для полей с несколькими значениями (категорий)
                    // нужно добавить каждое значение отдельно
                    value.forEach(item => formData.append(key, item));
                } else {
                    formData.append(key, value);
                }
            }
        });
        return formData;
    };

    // обработчик отправки формы
    formSubmitted = (movie) => {
        // сборка данных для запроса
        const formData = this.gatherFormData(movie);

        // отправка запроса
        return axios.post(MOVIES_URL, formData, {
            headers: {'Content-Type': 'multipart/form-data'}
        })
            .then(response => {
                // при успешном создании response.data содержит данные фильма
                const movie = response.data;
                console.log(movie);
                // если всё успешно, переходим на просмотр страницы фильма с id,
                // указанным в ответе
                this.props.history.replace('/movies/' + movie.id);
            })
            .catch(error => {
                console.log(error);
                // error.response - ответ с сервера
                // при ошибке 400 в ответе с сервера содержатся ошибки валидации
                // пока что выводим их в консоль
                console.log(error.response);
                this.showErrorAlert(error.response);
            });
    };

    render() {
        const alert = this.state.alert;
        return <Fragment>
            {alert ? <div className={"mb-2 alert alert-" + alert.type}>{alert.message}</div> : null}
            <MovieForm onSubmit={this.formSubmitted}/>
        </Fragment>
    }
}


export default MovieAdd;