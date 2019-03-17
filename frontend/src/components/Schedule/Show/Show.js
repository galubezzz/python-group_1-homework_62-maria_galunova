import React, {Component} from 'react';

class Show extends Component {


    render() {
        console.log(this.props.show);
        return (
            <div>
                {this.props.show.name.name}
                {this.props.show.price}
                {this.props.show.start_time}
                {this.props.show.end_time}
            </div>
        )
    }
}

export default Show;