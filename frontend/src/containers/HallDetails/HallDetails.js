import React, {Component} from 'react';
import axios from 'axios';
import {NavLink} from 'react-router-dom';

class HallDetails extends Component {

    state = {
        hall: null,
        shows: null
    };

    componentDidMount() {
        // match - атрибут, передаваемый роутером, содержащий путь к этому компоненту
        const match = this.props.match;
        const HALL_URL = 'http://localhost:8000/api/v1/hall/';

        // match.params - переменные из пути (:id)
        // match.params.id - значение переменной, обозначенной :id в свойстве path Route-а.
        axios.get(HALL_URL + match.params.id)
            .then(response => {
                console.log(response.data);
                return response.data;
            })
            .then(hall => this.setState({hall}))
            .catch(error => console.log(error));

        const SHOW_URL = "http://127.0.0.1:8000/api/v1/show/";
        axios.get(SHOW_URL)
            .then(response => {
                console.log(response.data);
                return response.data;
            })
            .then(shows =>
            {   let showsInHall = shows.filter(show => show.hall.id === match.params.id);
                this.setState({shows: showsInHall})})
            .catch(error => console.log(error));
    }

    render() {

        if (!this.state.hall || !this.state.shows) return null;

        return (
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">{this.state.hall.name}</h5>
                    <NavLink className="nav-link" to="/halls/">К списку залов</NavLink>
                    {this.state.shows.map(show => {
                    return <div key={show.id}>
                            !!!{show.name.name}
                    </div>
                })}
                </div>
            </div>
        )
    }
}

export default HallDetails;