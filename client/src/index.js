import React from 'react';
import ReactDOM from 'react-dom';
import TicketSubmission from './components/ticket-submission';
import {Provider} from 'react-redux';
import './index.css';

import store from './store';

ReactDOM.render(
  <Provider store={store}>
    <TicketSubmission />
  </Provider>,
  document.getElementById('root')
);
