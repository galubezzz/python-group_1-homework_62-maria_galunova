import React, {Component} from 'react';


class Logout extends Component {
    componentDidMount() {
        localStorage.removeItem('auth-token');
        localStorage.removeItem('username');
        localStorage.removeItem('is_admin');
        localStorage.removeItem('is_staff');
        this.props.history.push('/');
    };

    render() { return null; }
}


export default Logout;