import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import { MuiThemeProvider, createMuiTheme} from 'material-ui/styles';
import store from "./ducks/store";
import App from './App';
import { unregister } from './registerServiceWorker';

const theme = createMuiTheme();

ReactDOM.render(
    <Provider store={store}>
        <HashRouter>
            <MuiThemeProvider theme={theme}>
                 <App />
            </MuiThemeProvider>
        </HashRouter>
    </Provider>
    , document.getElementById('root'));
unregister();
