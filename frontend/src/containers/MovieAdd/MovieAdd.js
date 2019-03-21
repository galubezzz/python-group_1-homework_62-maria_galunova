import React, {Component, Fragment} from 'react';
//import {MOVIES_URL} from "../../api-urls";
import axios from 'axios';
import MovieForm from "../../components/MovieForm/MovieForm";

const MOVIES_URL = 'http://localhost:8000/api/v1/movies/';

class MovieAdd extends Component {
    state = {
        // сообщение об ошибке
        alert: null,
        errors: {}
    };


    // сборка данных для запроса
    gatherFormData = (movie) => {
        let formData = new FormData();
        Object.keys(movie).forEach(key => {
            const value = movie[key];
            if (value) {
                if (Array.isArray(value)) {
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
        console.log(movie);
        // отправка запроса
        return axios.post(MOVIES_URL, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': 'Token ' + localStorage.getItem('auth-token')
            }
        })
            .then(response => {
                // при успешном создании response.data содержит данные фильма
                const movie = response.data;

                // если всё успешно, переходим на просмотр страницы фильма с id,
                // указанным в ответе
                this.props.history.replace('/movies/' + movie.id);
            })
            .catch(error => {
                console.log(error);
                console.log(error.response);
                this.setState({
                    ...this.state,
                    errors: error.response.data

                });
            });
    }

        render()
        {
            const alert = this.state.alert;
            return <Fragment>
                {alert ? <div className={"mb-2 alert alert-" + alert.type}>{alert.message}</div> : null}
                <MovieForm onSubmit={this.formSubmitted} errors={this.state.errors}/>
            </Fragment>
        }
    }


    export default MovieAdd;