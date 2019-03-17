import React, {Component} from 'react';
import Show from "./Show/Show";

class Schedule extends Component {


    render() {
        return (
            <div>
                <h3>Ближайшие сеансы:</h3>
                {this.props.schedule.map(show => {
                    return <Show show = {show} key={show.id}/>
                })}
            </div>

        )
    }
}

export default Schedule;