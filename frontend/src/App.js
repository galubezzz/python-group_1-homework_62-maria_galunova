import React, { Component } from 'react';
import {BrowserRouter} from 'react-router-dom';
import {Switch, Route} from 'react-router';
import Movies from "./containers/Movies/Movies"
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="container">
                <BrowserRouter>
                    <Switch>
                        <Route path="/" component={Movies}/>
                    </Switch>
                </BrowserRouter>
            </div>
    );
  }
}

export default App;
