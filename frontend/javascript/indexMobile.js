import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { MuiThemeProvider } from '@material-ui/core/styles';

import { App } from './AppMobile';
// import registerServiceWorker from './registerServiceWorker';
import './index.css';
import configureStore from './configureStore';
import './style.css';
import theme from './theme';

const store = configureStore();

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <MuiThemeProvider theme={theme}>
      <Provider store={store}>
        <App />
      </Provider>
    </MuiThemeProvider>,
    document.getElementById('root')
  );
});

// registerServiceWorker();
