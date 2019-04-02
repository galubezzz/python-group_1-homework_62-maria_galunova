import React, {Fragment, Component} from 'react'
import axios from 'axios';
import Movie from "../../components/Movie/Movie";
import {loadMovies} from "../../store/actions/movie-list";
import {connect} from "react-redux";


// компонент для показа списка фильмов клиенту
// фильмы запрашиваются из API в момент показа компонента на странце (mount)
const MOVIES_URL = 'http://localhost:8000/api/v1/movies';

class Movies extends Component {

    componentDidMount() {
        this.props.loadMovies();
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
                {this.props.movies.map(movie => {
                    return <div key={movie.id}>
                        <Movie movie={movie} updateBoard={this.getMovies.bind(this)} />
                    </div>
                })}
            </div>
        </Fragment>
    }
}

const mapStateToProps = (state) => state.movies;
const mapDispatchToProps = (dispatch) => ({
    loadMovies: () => dispatch(loadMovies())
});


export default connect(mapStateToProps, mapDispatchToProps)(Movies);
