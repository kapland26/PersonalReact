import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import store from "./ducks/store";
import App from './App';
import unregister from './registerServiceWorker';

ReactDOM.render(
    <Provider store={store}>
        <HashRouter>
            <MuiThemeProvider>
                 <App />
            </MuiThemeProvider>
        </HashRouter>
    </Provider>
    , document.getElementById('root'));
unregister();
