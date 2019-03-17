import React, {Component} from 'react';
import Show from "./Show/Show";

class Schedule extends Component {


    render() {
        return (
           this.props.schedule.map(show => {
                    return <Show show = {show} key={show.id}/>
                })
        )
    }
}

export default Schedule;