import React, {Component} from 'react';
import axios from 'axios';
import {NavLink} from 'react-router-dom';

class MovieDetails extends Component {

    state = {
        movie: null
    };

    componentDidMount() {
        // match - атрибут, передаваемый роутером, содержащий путь к этому компоненту
        const match = this.props.match;
        const MOVIES_URL = 'http://127.0.0.1:8000/api/v1/movies/';

        // match.params - переменные из пути (:id)
        // match.params.id - значение переменной, обозначенной :id в свойстве path Route-а.
        axios.get(MOVIES_URL + match.params.id)
            .then(response => {
                console.log(response.data);
                return response.data;
            })
            .then(movie => this.setState({movie}))
            .catch(error => console.log(error));
    }

    render() {

        if (!this.state.movie) return null;
        return (
            <div className="card" style={{"width": "30rem"}}>
                <img src={this.state.movie.poster} className="card-img-top" alt="..."/>
                <div className="card-body">
                    <h5 className="card-title">{this.state.movie.name}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">Дата начала показа: {this.state.movie.release_date}</h6>
                    <h6 className="card-subtitle mb-2 text-muted">Дата окончания показа: {this.state.movie.finish_date}</h6>
                    <p className="card-text">Описание: {this.state.movie.description}</p>
                    <p className="card-text">Жанр: {this.state.movie.сategory}</p>
                    <NavLink className="nav-link" to="/">К списку фильмов</NavLink>
                </div>
            </div>
        )
    }
}

export default MovieDetails;