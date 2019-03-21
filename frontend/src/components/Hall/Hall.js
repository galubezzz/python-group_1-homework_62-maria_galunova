import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import axios from 'axios';



class Hall extends Component {

    deleteHall(id) {
        if (!localStorage.getItem('auth-token')) {
            this.props.history.push("/login");
        }
        console.log(id);
        const HALL_URL = 'http://localhost:8000/api/v1/hall/';
        axios.delete(HALL_URL + id, {
            headers: {
                'Authorization': 'Token ' + localStorage.getItem('auth-token')
            }
        }).then(response => {
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
                    <NavLink className="nav-link card-title h5 text-dark p-0" to={link}>{this.props.hall.name}</NavLink>
                    <NavLink to={edit_link}>Редактировать</NavLink>
                    <i className="fas fa-trash-alt m-1 " onClick={() => (this.deleteHall(this.props.hall.id))}></i>
                </div>
            </div>
        )
    }
}

export default Hall;