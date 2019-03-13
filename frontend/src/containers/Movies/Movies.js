import React, {Fragment, Component} from 'react'
import {NavLink} from "react-router-dom";
import axios from 'axios';


// компонент для показа списка фильмов клиенту
// фильмы запрашиваются из API в момент показа компонента на странце (mount)
const MOVIES_URL = 'http://localhost:8000/api/v1/movies';

class Movies extends Component {
    state = {
        movies: [],
    };

    componentDidMount() {
        axios.get(MOVIES_URL)
            .then(response => {console.log(response.data); return response.data;})
            .then(movies => this.setState({movies}))
            .catch(error => console.log(error));
    }

    render() {
        return <Fragment>
            <p><NavLink to='/movies/add'>Добавить фильм</NavLink></p>
            <div className='row'>
                {this.state.movies.map(movie => {
                    return <div className='col-xs-12 col-sm-6 col-lg-4 mt-3'  key={movie.id}>
                        <div>{movie.name} {movie.description}</div>
                    </div>
                })}
            </div>
        </Fragment>
    }
}


export default Movies;