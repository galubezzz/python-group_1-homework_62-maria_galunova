import React, {Fragment, Component} from 'react'
import {NavLink} from "react-router-dom";
import axios from 'axios';
import Movie from "../../components/Movie/Movie";


// компонент для показа списка фильмов клиенту
// фильмы запрашиваются из API в момент показа компонента на странце (mount)
const MOVIES_URL = 'http://localhost:8000/api/v1/movies';

class Movies extends Component {
    state = {
        movies: [],
    };

    componentDidMount() {
        this.getMovies();
    }

    getMovies(){
        axios.get(MOVIES_URL)
            .then(response => {console.log(response.data); return response.data;})
            .then(movies => this.setState({movies}))
            .catch(error => console.log(error));
    }

    render() {
        return <Fragment>
            <div className='row'>
                {this.state.movies.map(movie => {
                    return <div key={movie.id}>
                        <Movie movie={movie} updateBoard={this.getMovies.bind(this)}/>
                    </div>
                })}
            </div>
        </Fragment>
    }
}


export default Movies;