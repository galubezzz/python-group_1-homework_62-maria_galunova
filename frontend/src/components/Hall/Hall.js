import React, {Component, Fragment} from 'react';
import {NavLink} from 'react-router-dom';
import axios from 'axios';


class Hall extends Component {
    state = {

        // сообщение об ошибке
        alert: null,
    };

    deleteHall(id) {
        if (!localStorage.getItem('auth-token')) {
            this.props.history.push("/login");
        }
        //console.log(id);
        const HALL_URL = 'http://localhost:8000/api/v1/hall/';
        axios.delete(HALL_URL + id, {
            headers: {
                'Authorization': 'Token ' + localStorage.getItem('auth-token')
            }
        }).then(response => {
            console.log(response.data);
            this.props.updateBoard();
            return response.data;

        }).catch(error => {
            console.log(error);
            let new_alert = {type: 'danger', message: `Hall was not deleted!`};
            this.setState({alert: new_alert});
        })
        ;
    }

    render() {
        const link = "/halls/" + this.props.hall.id;
        const edit_link = "/halls/edit/" + this.props.hall.id;
        let alert = null;
        if (this.state.alert) {
            alert = <div className={"alert alert-" + this.state.alert.type}>{this.state.alert.message}</div>
        }
        return (<Fragment>
                {alert}
                <div className="card mb-4">
                    <div className="card-body">
                        <NavLink className="nav-link card-title h5 text-dark p-0"
                                 to={link}>{this.props.hall.name}</NavLink>
                        <NavLink to={edit_link}>Редактировать</NavLink>
                        <i className="fas fa-trash-alt m-1 " onClick={() => (this.deleteHall(this.props.hall.id))}></i>
                    </div>
                </div>
            </Fragment>

        )
    }
}

export default Hall;