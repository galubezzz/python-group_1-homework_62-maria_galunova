import React, {Component} from 'react';
import Show from "./Show/Show";

class Schedule extends Component {


    render() {
        return (
            <div>
                <p>Ближайшие сеансы:</p>
                {this.props.schedule.map(show => {
                    return <Show show = {show} key={show.id}/>
                })}
            </div>

        )
    }
}

export default Schedule;