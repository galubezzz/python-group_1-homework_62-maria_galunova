import React, { Component } from 'react';
import {BrowserRouter} from 'react-router-dom';
import {Switch, Route} from 'react-router';
import Movies from "./containers/Movies/Movies"
import MovieDetails from "./containers/MovieDetails/MovieDetails"
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="container">
                <BrowserRouter>
                    <Switch>
                        <Route exact path="/" component={Movies}/>
                        <Route path="/movie/:id" component={MovieDetails}/>
                    </Switch>
                </BrowserRouter>
            </div>
    );
  }
}

export default App;
