import React, {Component, Fragment} from 'react';
import HallForm from "../../components/HallForm/HallForm";
import {HALL_ADD_SUCCESS, addHall} from "../../store/actions/hall-add";
import connect from "react-redux/es/connect/connect";


class HallAdd extends Component {


    // обработчик отправки формы
    formSubmitted = (hall) => {

    // отправка запроса
    // распаковываем auth из proms
    const {auth} = this.props;
    console.log(auth.token, 'auth.token HallAdd');
    return this.props.addHall(hall, auth.token).then(result => {
        // если результат запроса удачный - переходим на страницу добавленного зала
        if(result.type === HALL_ADD_SUCCESS) {
            console.log(result.hall.id, 'result.hall.id');
            this.props.history.push('/halls/' + result.hall.id);
        }
    })
    };

    render() {
        const {errors} = this.props.hallAdd;
        return <Fragment>
            <HallForm errors={errors} onSubmit={this.formSubmitted}/>
        </Fragment>
    }
}


const mapStateToProps = state => {
    return {
        // hallAdd - идет в root
        hallAdd: state.hallAdd,
        auth: state.auth  // auth нужен, чтобы получить из него токен для запроса
    }
};
const mapDispatchProps = dispatch => {
    return {
        addHall: (hall, token) => dispatch(addHall(hall, token))
    }
};

export default connect(mapStateToProps, mapDispatchProps)(HallAdd);