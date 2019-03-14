import React, {Component, Fragment} from 'react'
import axios from "axios";
//import {MOVIES_URL} from "../../api-urls";
import MovieForm from "../../components/MovieForm/MovieForm";


class MovieEdit extends Component {
    state = {
        // исходные данные фильма, загруженные из API.
        movie: null,

        // сообщение об ошибке
        alert: null,
    };

    componentDidMount() {
        // match.params - переменные из пути к этому компоненту
        // match.params.id - значение переменной, обозначенной :id в свойстве path Route-а.
        const MOVIES_URL = 'http://localhost:8000/api/v1/movies/';
        axios.get(MOVIES_URL + this.props.match.params.id)
            .then(response => {
                const movie = response.data;
                console.log(movie);
                this.setState(prevState => {
                    const newState = {...prevState};
                    newState.movie = movie;
                    newState.movie.category = movie.category.map(category => category.id);
                    return newState;
                });
            })
            .catch(error => {
                console.log(error);
                console.log(error.response);
            });
    }

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
         const MOVIES_URL = 'http://localhost:8000/api/v1/movies/';
        // отправка запроса
        return axios.put(MOVIES_URL + this.props.match.params.id + '/', formData, {
            headers: {'Content-Type': 'multipart/form-data'}
        })
            .then(response => {
                // при успешном создании response.data содержит данные фильма
                const movie = response.data;
                console.log(movie);
                // если всё успешно, переходим на просмотр страницы фильма с id,
                // указанным в ответе
                this.props.history.replace('/movie/' + movie.id);
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
        const {alert, movie} = this.state;
        return <Fragment>
            {alert ? <div className={"mb-2 alert alert-" + alert.type}>{alert.message}</div> : null}
            {movie ? <MovieForm onSubmit={this.formSubmitted} movie={movie}/> : null}
        </Fragment>
    }
}


export default MovieEdit