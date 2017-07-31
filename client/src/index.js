/////////////////////////////////////////////////////////////////////////////////////
///////////////                  Imports                   /////////////////////////
///////////////////////////////////////////////////////////////////////////////////
//Importing react
import React from 'react';

//Importing ReactDOM
import ReactDOM from 'react-dom';

//Importing the index css file
import './index.css';

//Importing the Main Page (React-Router)
import MainPage from './components/main-page';

//Importing Provider so all child class can use store
import {Provider} from 'react-redux';

//Importing the store
import store from './store';

/////////////////////////////////////////////////////////////////////////////////////
///////////////                 Dom Render                 /////////////////////////
///////////////////////////////////////////////////////////////////////////////////
//Rendering everything insde the root element
ReactDOM.render(
  <Provider store={store}>
    <MainPage />
  </Provider>,
  document.getElementById('root')
);
