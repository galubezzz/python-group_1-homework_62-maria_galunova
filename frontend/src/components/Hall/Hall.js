import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import axios from 'axios';


class Hall extends Component {

    deleteHall(id) {
        console.log(id);
        const HALL_URL = 'http://localhost:8000/api/v1/hall/';
        axios.delete(HALL_URL + id, {}).then(response => {
            console.log(response.data);
            this.props.updateBoard();
            return response.data;

        }).catch(error => console.log(error));
    }

    render() {
        const link = "/halls/" + this.props.hall.id;
        const edit_link = "/halls/edit/" + this.props.hall.id;
        return (
            <div className="card mb-4">
                <div className="card-body">
                    <h5 className="card-title">{this.props.hall.name}</h5>
                    <NavLink className="nav-link" to={link}>Подробнее</NavLink>
                    <NavLink className="nav-link" to={edit_link}>Редактировать</NavLink>
                    <i className="fas fa-trash-alt nav-link" onClick={() => (this.deleteHall(this.props.hall.id))}></i>
                </div>
            </div>
        )
    }
}

export default Hall;