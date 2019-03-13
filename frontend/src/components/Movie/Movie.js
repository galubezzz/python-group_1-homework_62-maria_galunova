import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';


class Movie extends Component {
    render() {
        const link = "/movie/" + this.props.movie.id;
        return (
            <div className="card mb-4">
                <div className="card-body">
                    <h5 className="card-title">{this.props.movie.name}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">{this.props.movie.release_date}</h6>
                    <p className="card-text">{this.props.movie.description}</p>
                    <NavLink className="nav-link" to={link}>Подробнее</NavLink>
                </div>
            </div>
        )
    }
}

export default Movie;