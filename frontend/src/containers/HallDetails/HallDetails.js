import React, {Component} from 'react';
import Schedule from "../../components/Schedule/Schedule";
import {loadHall, loadShows} from "../../store/actions/hall-details";
import connect from "react-redux/es/connect/connect";

class HallDetails extends Component {

    componentDidMount() {
       this.props.loadHall(this.props.match.params.id);
       this.props.loadShows(this.props.match.params.id);
    }

    render() {

        if (!this.props.hallDetails.hall || !this.props.hallDetails.shows) return null;

        return (
            <div className="card m-3">
                <div className="card-body">
                    <h4 className="card-title">{this.props.hallDetails.hall.name}</h4>
                    <Schedule schedule = {this.props.hallDetails.shows}/>
                </div>
            </div>
        )
    }
}
const mapStateToProps = state => {
    return {
        hallDetails: state.hallDetails,
        auth: state.auth
    }
};

const mapDispatchProps = dispatch => {
    return {
        loadHall: (id) => dispatch(loadHall(id)),
        loadShows: (id) => dispatch(loadShows(id)),
    }
};
export default connect(mapStateToProps, mapDispatchProps)(HallDetails);
