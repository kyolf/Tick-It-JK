import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import MainPage from './components/main-page';
import {Provider} from 'react-redux';


import store from './store';

ReactDOM.render(
  <Provider store={store}>
    <MainPage />
  </Provider>,
  document.getElementById('root')
);
