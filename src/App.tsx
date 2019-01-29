import React, { Component } from 'react';
import './App.css';
import { configureStore } from './store';
import { Provider } from 'react-redux';
import { Chart } from './containers/Chart';

const store = configureStore();

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <Chart/>
            </Provider>
        );
    }
}

export default App;
