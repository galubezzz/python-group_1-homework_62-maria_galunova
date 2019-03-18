import React, {Fragment, Component} from 'react'
import {NavLink} from "react-router-dom";
import axios from 'axios';
import Hall from "../../components/Hall/Hall";


// компонент для показа списка фильмов клиенту
// фильмы запрашиваются из API в момент показа компонента на странце (mount)
const HALLS_URL = "http://127.0.0.1:8000/api/v1/hall/";

class Halls extends Component {
    state = {
        halls: [],
    };

    componentDidMount() {
        this.getHalls();
    }

    getHalls(){
        axios.get(HALLS_URL)
            .then(response => {console.log(response.data); return response.data;})
            .then(halls => this.setState({halls}))
            .catch(error => console.log(error));
    }

    render() {
        return <Fragment>
            <div className='row m-3'>
                {this.state.halls.map(hall => {
                    return <div className="col-sm-3" key={hall.id}>
                            <Hall hall={hall} updateBoard={this.getHalls.bind(this)}/>
                    </div>
                })}
            </div>
        </Fragment>
    }
}


export default Halls;