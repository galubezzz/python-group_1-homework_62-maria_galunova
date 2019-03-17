import React, {Component} from 'react';

class Show extends Component {


    render() {
        console.log(this.props.show);
        return (
            <div>
                <h5>Фильм: {this.props.show.name.name}</h5>
                <p>Зал: {this.props.show.hall.name} </p>
                <p>Цена: {this.props.show.price}</p>
                <p>Дата начала показа: {this.props.show.start_time.slice(0, 10)}</p>
                <p>Время начала показа: {this.props.show.start_time.slice(11, 16)}</p>
            </div>
        )
    }
}

export default Show;