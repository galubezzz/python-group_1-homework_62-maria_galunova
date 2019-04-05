import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import { withRouter } from "react-router";
import {deleteMovie, MOVIE_DELETE_SUCCESS} from "../../store/actions/movie-delete";
import connect from "react-redux/es/connect/connect";


class Movie extends Component {

    movieDelete(id) {
        return this.props.deleteMovie(id, this.props.auth.token).then(result => {
            // если результат запроса удачный - переходим на страницу списка залов
            console.log(result.type);
            if (result.type === MOVIE_DELETE_SUCCESS) {
                this.props.history.push('/');
            }
        })
    }

    render() {
        const link = "/movies/" + this.props.movie.id;
        const edit_link = "/movies/edit/" + this.props.movie.id;
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
                    <i className="fas fa-trash-alt m-1" onClick={() => (this.movieDelete(this.props.movie.id))}> </i>
                </div>
            </div>
        )
    }
}


const mapStateToProps = state => {
    return {
        auth: state.auth,  // auth нужен, чтобы получить из него токен для запроса,
    }
};

const mapDispatchToProps = (dispatch) => ({
    deleteMovie: (movie_id, token) => dispatch(deleteMovie(movie_id, token))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Movie));