import React, {Component} from 'react';

import axios from 'axios';


class HallAdd extends Component {
    state = {
        // фильм, который мы редактируем
        hall: {
            name: "",
        },

        // сообщение об ошибке
        alert: null,

        // индикатор отключения кнопки submit, если запрос выполняется
        submitDisabled: false
    };


    // функция, обновляющая поля в this.state.task
    updateHallState = (fieldName, value) => {
        this.setState(prevState => {
            let newState = {...prevState};
            let hall = {...prevState.hall};
            hall[fieldName] = value;
            newState.hall = hall;
            return newState;
        });
    };
    // обработчик ввода в поля ввода
    inputChanged = (event) => {
        const value = event.target.value;
        const fieldName = event.target.name;
        this.updateHallState(fieldName, value);
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
        const HALLS_URL = 'http://localhost:8000/api/v1/hall/';
        const match = this.props.match;
        // отправка запроса
        axios.put(HALLS_URL + match.params.id + '/', this.state.hall)
            .then(response => {
                console.log(response.data);
                if (response.status === 200) return response.data;
                throw new Error('Hall was not added!');
            })
            // если всё успешно, переходим на просмотр страницы фильма с id,
            // указанным в ответе
            .then(hall => this.props.history.replace('/halls/'))
            .catch(error => {
                console.log(error);
                this.setState(prevState => {
                    let newState = {...prevState};
                    newState.alert = {type: 'danger', message: `Hall was not added!`};
                    newState.submitDisabled = false;
                    return newState;
                });
            });
    };

     componentDidMount() {
        // match - атрибут, передаваемый роутером, содержащий путь к этому компоненту
        const match = this.props.match;
        const HALL_URL = 'http://localhost:8000/api/v1/hall/';

        // match.params - переменные из пути (:id)
        // match.params.id - значение переменной, обозначенной :id в свойстве path Route-а.
        axios.get(HALL_URL + match.params.id)
            .then(response => {
                console.log(response.data);
                return response.data;
            })
            .then(hall => this.setState({hall: hall}))
            .catch(error => console.log(error));
    }

    render() {
        // распаковка данных фильма, чтобы было удобнее к ним обращаться
        const {name} = this.state.hall;

        // создание разметки для алерта, если он есть
        let alert = null;
        if (this.state.alert) {
            alert = <div className={"alert alert-" + this.state.alert.type}>{this.state.alert.message}</div>
        }


        return <div>
            {alert}
            <form onSubmit={this.formSubmitted}>
                <div className="form-group">
                    <label className="font-weight-bold">Название</label>
                    <input type="text" className="form-control" name="name" value={name} onChange={this.inputChanged}/>
                </div>
                <button disabled={this.state.submitDisabled} type="submit"
                        className="btn btn-primary">Сохранить</button>
            </form>
        </div>;
    };
}


export default HallAdd;