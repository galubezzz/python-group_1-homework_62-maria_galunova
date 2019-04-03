import React, {Component} from 'react';
import axios from 'axios';
import {NavLink} from 'react-router-dom';
import Schedule from "../../components/Schedule/Schedule";

class MovieDetails extends Component {

    state = {
        movie: null,
        shows: null,
    };

    componentDidMount() {
        // match - атрибут, передаваемый роутером, содержащий путь к этому компоненту
        const match = this.props.match;
        const MOVIES_URL = 'http://127.0.0.1:8000/api/v1/movies/';
        let current_date = new Date();
        current_date = current_date.toISOString().slice(0, 10);
        console.log(current_date, 'current_date');

        let next_date = new Date();
        next_date.setDate(next_date.getDate() + 3);
        next_date = next_date.toISOString().slice(0, 10);
        console.log(next_date, 'next_date');

        // match.params - переменные из пути (:id)
        // match.params.id - значение переменной, обозначенной :id в свойстве path Route-а.
        axios.get(MOVIES_URL + match.params.id)
            .then(response => {
                console.log(response.data);
                return response.data;
            })
            .then(movie => this.setState({movie}))
            .catch(error => console.log(error));

        const SHOW_URL = "http://127.0.0.1:8000/api/v1/show/";
        axios.get(SHOW_URL + '?movie_id=' + match.params.id + '&min_start_date=' + current_date + '&max_start_date=' + next_date)
            .then(response => {
                console.log(response.data);
                return response.data;
            })
            .then(shows =>
            {this.setState({shows: shows})})
            .catch(error => console.log(error));
    }

    render() {

        if (!this.state.movie || !this.state.shows) return null;
        const categotries = this.state.movie.category.map(category => category.name);
        return (
            <div className="card m-3" style={{"width": "30rem"}}>
                <img src={this.state.movie.poster} className="card-img-top" alt="..."/>
                <div className="card-body">
                    <h5 className="card-title">{this.state.movie.name}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">Дата начала показа: {this.state.movie.release_date}</h6>
                    <h6 className="card-subtitle mb-2 text-muted">Дата окончания показа: {this.state.movie.finish_date}</h6>
                    <p className="card-text">Описание: {this.state.movie.description}</p>
                    <p className="card-text">Жанр: {categotries}</p>
                    <Schedule schedule={this.state.shows}/>
                </div>
            </div>
        )
    }
}

export default MovieDetails;