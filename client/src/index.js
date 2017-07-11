import React from 'react';
import ReactDOM from 'react-dom';
import MainPage from './components/main-page';
import {Provider} from 'react-redux';
import './index.css';

import store from './store';

ReactDOM.render(
  <Provider store={store}>
    <MainPage />
  </Provider>,
  document.getElementById('root')
);
