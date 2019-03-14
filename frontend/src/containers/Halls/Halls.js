import React, {Fragment, Component} from 'react'
import {NavLink} from "react-router-dom";
import axios from 'axios';
import Movie from "../../components/Movie/Movie";


// компонент для показа списка фильмов клиенту
// фильмы запрашиваются из API в момент показа компонента на странце (mount)
const HALLS_URL = "http://127.0.0.1:8000/api/v1/hall/";

class Halls extends Component {
    state = {
        halls: [],
    };

    componentDidMount() {
        this.getMovies();
    }

    getMovies(){
        axios.get(HALLS_URL)
            .then(response => {console.log(response.data); return response.data;})
            .then(halls => this.setState({halls}))
            .catch(error => console.log(error));
    }

    render() {
        return <Fragment>
            <p><NavLink to='/movie/add'>Добавить зал</NavLink></p>
            <div className='row'>
                {this.state.halls.map(hall => {
                    return <div key={hall.id}>
                            {hall.name}
                    </div>
                })}
            </div>
        </Fragment>
    }
}


export default Halls;