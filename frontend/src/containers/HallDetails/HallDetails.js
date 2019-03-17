import React, {Component} from 'react';
import axios from 'axios';
import {NavLink} from 'react-router-dom';
import Schedule from "../../components/Schedule/Schedule";

class HallDetails extends Component {

    state = {
        hall: null,
        shows: null
    };

    componentDidMount() {
        // match - атрибут, передаваемый роутером, содержащий путь к этому компоненту
        const match = this.props.match;
        const HALL_URL = 'http://localhost:8000/api/v1/hall/';

        let current_date = new Date();
        current_date = current_date.toISOString().slice(0, 10);
        console.log(current_date, 'current_date');

        let next_date = new Date();
        next_date.setDate(next_date.getDate() + 3);
        next_date = next_date.toISOString().slice(0, 10);
        console.log(next_date, 'next_date');

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
        axios.get(SHOW_URL + '?hall_id=' + match.params.id + '&min_start_date=' + current_date + '&max_start_date=' + next_date)
            .then(response => {
                console.log(response.data);
                return response.data;
            })
            .then(shows =>
            {this.setState({shows: shows})})
            .catch(error => console.log(error));}

    render() {

        if (!this.state.hall || !this.state.shows) return null;

        return (
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">{this.state.hall.name}</h5>
                    <NavLink className="nav-link" to="/halls/">К списку залов</NavLink>
                    <Schedule schedule = {this.state.shows}/>
                </div>
            </div>
        )
    }
}

export default HallDetails;