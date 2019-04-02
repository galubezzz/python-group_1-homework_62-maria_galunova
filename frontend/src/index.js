import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import "react-datepicker/dist/react-datepicker.css";

import {createStore, applyMiddleware} from 'redux'
import rootReducer from './store/reducers/root'
import {Provider} from 'react-redux'
import thunkMiddleware from 'redux-thunk';

// TODO: убрать, как только все запросы "переедут" в actions.js
import axios from 'axios';
import {BASE_URL} from "./api-urls";
axios.defaults.baseURL = BASE_URL;

const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

ReactDOM.render(
    <Provider store={store}><App /></Provider>,
    document.getElementById('root')
);


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
