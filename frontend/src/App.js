import React, {Component} from 'react';
import {BrowserRouter} from 'react-router-dom';
import {Switch, Route} from 'react-router';
import Movies from "./containers/Movies/Movies"
import MovieDetails from "./containers/MovieDetails/MovieDetails"
import MovieEdit from "./containers/MovieEdit/MovieEdit"
import MovieAdd from "./containers/MovieAdd/MovieAdd"
import './App.css';

class App extends Component {

    render() {
        return (
            <div className="container">
                <BrowserRouter>
                    <Switch>
                        <Route exact path="/" component={Movies}/>
                        <Route exact path="/movie/add" component={MovieAdd}/>
                        <Route exact path="/movie/:id" component={MovieDetails}/>
                        <Route exact path="/movie/edit/:id" component={MovieEdit}/>
                    </Switch>
                </BrowserRouter>
            </div>
        );
    }
}

export default App;
