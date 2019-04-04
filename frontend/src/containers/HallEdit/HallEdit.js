import React, {Component} from 'react';
import {loadHall, HALL_EDIT_SUCCESS, saveHall} from "../../store/actions/hall-edit";
import {connect} from "react-redux";
import HallForm from "../../components/HallForm/HallForm";


class HallEdit extends Component {

    // обработчик отправки формы
    formSubmitted = (hall) => {
        const {auth} = this.props;
        console.log(auth.token);
        return this.props.saveHall(hall, auth.token).then(result => {
            if(result.type === HALL_EDIT_SUCCESS) {
                console.log(result);
                this.props.history.push('/halls/' + result.hall.id);
            }
        });
    };

     componentDidMount() {
       this.props.loadHall(this.props.match.params.id);
    }

    render() {
        // распаковка данных, чтобы было удобнее к ним обращаться
        const hall = this.props.hallEdit.hall;
        const errors = this.props.hallEdit.errors;
        console.log(hall);

        return <div>
            {hall ? <HallForm onSubmit={this.formSubmitted} hall={hall} errors={errors}/> : null}
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
};
export default connect(mapStateToProps, mapDispatchProps)(HallEdit);