import React, {Component} from 'react';
import {BrowserRouter} from 'react-router-dom';
import {Switch, Route} from 'react-router';
import Movies from "./containers/Movies/Movies"
import MovieDetails from "./containers/MovieDetails/MovieDetails"
import MovieEdit from "./containers/MovieEdit/MovieEdit"
import MovieAdd from "./containers/MovieAdd/MovieAdd"
import Halls from "./containers/Halls/Halls"
import HallDetails from "./containers/HallDetails/HallDetails"
import HallAdd from "./containers/HallAdd/HallAdd"
import HallEdit from "./containers/HallEdit/HallEdit"
import Login from "./containers/Login/Login";
import Logout from "./containers/Logout/Logout";
import Layout from "./components/Layout/Layout"
import './App.css';
import AuthRoute from "./components/AuthRoute/AuthRoute";
import Register from "./containers/Register/Register";
import Account from "./containers/Account/Account";
import {tokenLogin} from "./store/actions/token-login"
import {connect} from "react-redux";


class App extends Component {

    componentDidMount() {
        this.props.tokenLogin();
    }

    render() {
        return (
            <div className="container">
                <BrowserRouter>
                    <Layout>
                        <Switch>
                            <Route exact path="/halls/" component={Halls}/>
                            <AuthRoute exact path="/halls/add" component={HallAdd}/>
                            <Route exact path="/halls/:id" component={HallDetails}/>
                            <AuthRoute exact path="/halls/edit/:id" component={HallEdit}/>
                            <Route exact path="/" component={Movies}/>
                            <AuthRoute exact path="/movies/add" component={MovieAdd}/>
                            <Route exact path="/movies/:id" component={MovieDetails}/>
                            <AuthRoute exact path="/movies/edit/:id" component={MovieEdit}/>
                            <Route path="/login" component={Login}/>
                            <Route path="/logout" component={Logout}/>
                            <Route path="/register" component={Register}/>
                            <Route path="/account" component={Account}/>

                        </Switch>
                    </Layout>
                </BrowserRouter>
            </div>
        );
    }
}

const mapStateToProps = state => state.app;
const mapDispatchToProps = dispatch => ({
    tokenLogin: () => dispatch(tokenLogin())
});



export default connect(mapStateToProps, mapDispatchToProps)(App);
