import React, {Component} from 'react';
import Schedule from "../../components/Schedule/Schedule";
import {loadMovie, loadShows} from "../../store/actions/movie-details";
import connect from "react-redux/es/connect/connect";
import axios from "axios";
import {CATEGORIES_URL} from "../../api-urls";

class MovieDetails extends Component {

    state = {
        category: []
    };

    componentDidMount() {
        this.props.loadMovie(this.props.match.params.id);
        this.props.loadShows(this.props.match.params.id);
        axios.get(CATEGORIES_URL)
            .then(response => {
                const category = response.data;
                console.log(category);
                // и сохраняем их в state
                this.setState(prevState => {
                    let newState = {...prevState};
                    newState.category = category;
                    return newState;
                });
            })
            .catch(error => {
                console.log(error);
                console.log(error.response)
            });
    }

    render() {

        if (!this.props.movieDetails.movie || !this.props.movieDetails.shows) return null;
        const categotries = this.props.movieDetails.movie.category.map(category => category.name);
        const movie = {...this.props.movieDetails.movie};
        return (
            <div className="card m-3" style={{"width": "30rem"}}>
                <img src={movie.poster} className="card-img-top" alt="..."/>
                <div className="card-body">
                    <h5 className="card-title">{movie.name}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">Дата начала показа: {movie.release_date}</h6>
                    <h6 className="card-subtitle mb-2 text-muted">Дата окончания показа: {movie.finish_date}</h6>
                    <p className="card-text">Описание: {movie.description}</p>
                    <p className="card-text">Жанр: {categotries}</p>
                    <Schedule schedule={this.props.movieDetails.shows}/>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        movieDetails: state.movieDetails,
        auth: state.auth
    }
};

const mapDispatchProps = dispatch => {
    return {
        loadMovie: (id) => dispatch(loadMovie(id)),
        loadShows: (id) => dispatch(loadShows(id)),
    }
};
export default connect(mapStateToProps, mapDispatchProps)(MovieDetails);