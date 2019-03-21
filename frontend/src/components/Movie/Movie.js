import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import axios from 'axios';


class Movie extends Component {
    state = {

        // сообщение об ошибке
        alert: null,
    };

    deleteMovie(id) {
        if (!localStorage.getItem('auth-token')) {
            this.props.history.push("/login");
        }
        console.log(id);
        const MOVIES_URL = 'http://localhost:8000/api/v1/movies/';
        axios.delete(MOVIES_URL + id, {
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
        });
    }

    render() {
        const link = "/movies/" + this.props.movie.id;
        const edit_link = "/movies/edit/" + this.props.movie.id;
        let alert = null;
        if (this.state.alert) {
            alert = <div className={"alert alert-" + this.state.alert.type}>{this.state.alert.message}</div>
        }
        return (
            <div className="card m-4" style={{"width": "18rem"}}>
                {alert}
                <img src={this.props.movie.poster} className="card-img-top" alt="..."/>
                <div className="card-body">
                    <NavLink className="nav-link card-title h5 text-dark p-0"
                             to={link}>{this.props.movie.name}</NavLink>
                    <h6 className="card-subtitle mb-2 text-muted">{this.props.movie.release_date}</h6>
                    <p className="card-text">{this.props.movie.description}</p>
                    <NavLink to={edit_link}>Редактировать</NavLink>
                    <i className="fas fa-trash-alt m-1" onClick={() => (this.deleteMovie(this.props.movie.id))}> </i>
                </div>
            </div>
        )
    }
}

export default Movie;