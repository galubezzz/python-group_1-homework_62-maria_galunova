import React, {Component, Fragment} from 'react';
import {NavLink} from 'react-router-dom';
import {connect} from "react-redux";
import {deleteHall, HALL_DELETE_SUCCESS} from "../../store/actions/hall-delete";
import { withRouter } from "react-router";


class Hall extends Component {
    hallDelete = (id) => {
        return this.props.deleteHall(id, this.props.auth.token).then(result => {
            // если результат запроса удачный - переходим на страницу списка залов
            console.log(result.type);
            if (result.type === HALL_DELETE_SUCCESS) {
                this.props.history.push('/halls/');
            }
        })
    };

    render() {
        const link = "/halls/" + this.props.hall.id;
        const edit_link = "/halls/edit/" + this.props.hall.id;
        return (<Fragment>
                {alert}
                <div className="card mb-4">
                    <div className="card-body">
                        <NavLink className="nav-link card-title h5 text-dark p-0"
                                 to={link}>{this.props.hall.name}</NavLink>
                        <NavLink to={edit_link}>Редактировать</NavLink>
                        <i className="fas fa-trash-alt m-1 " onClick={() => (this.hallDelete(this.props.hall.id))}> </i>
                    </div>
                </div>
            </Fragment>

        )
    }
}

const mapStateToProps = state => {
    return {
        auth: state.auth,  // auth нужен, чтобы получить из него токен для запроса,
    }
};

const mapDispatchToProps = (dispatch) => ({
    deleteHall: (hall_id, token) => dispatch(deleteHall(hall_id, token))
});


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Hall));