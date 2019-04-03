import React, {Component} from 'react';
import {loadHall, HALL_EDIT_SUCCESS, saveHall} from "../../store/actions/hall-edit";
import {connect} from "react-redux";


class HallEdit extends Component {
    state = {
        // фильм, который мы редактируем
        hall: {
            name: "",
        },

        // сообщение об ошибке
        alert: null,

        // индикатор отключения кнопки submit, если запрос выполняется
        submitDisabled: false,

        errors: {}
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
    formSubmitted = (hall) => {
        const {auth} = this.props;
        console.log(auth.token);
        return this.props.saveHall(hall, auth.token).then(result => {
            if(result.type === HALL_EDIT_SUCCESS) {
                this.props.history.push('/halls/' + result.hall.id);
            }
        });
    };

     componentDidMount() {
       this.props.loadHall(this.props.match.params.id);
    }

    showErrors = (name) => {
        if (this.props.errors && this.props.errors[name]) {
            return this.props.errors[name].map((error, index) => <p className="text-danger" key={index}>{error}</p>);
        }
        return null;
    };

    render() {
        // распаковка данных фильма, чтобы было удобнее к ним обращаться
        const name = this.props.hallEdit.hall || '';
        console.log(name);
        // создание разметки для алерта, если он есть

        return <div>
            <form onSubmit={this.formSubmitted}>
                {this.showErrors('non_field_errors')}
                <div className="form-group">
                    <label className="font-weight-bold">Название</label>
                    <input type="text" className="form-control" name="name" value={name} onChange={this.inputChanged}/>
                    {this.showErrors('name')}
                </div>
                <button disabled={this.props.loading} type="submit"
                        className="btn btn-primary">Сохранить</button>
            </form>
        </div>;
    };
}

const mapStateToProps = state => {
    return {
        hallEdit: state.hallEdit,
        auth: state.auth
    }
};

const mapDispatchProps = dispatch => {
    return {
        loadHall: (id) => dispatch(loadHall(id)),
        saveHall: (hall, token) => dispatch(saveHall(hall, token))
    }
}
export default connect(mapStateToProps, mapDispatchProps)(HallEdit);