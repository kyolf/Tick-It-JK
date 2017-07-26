/////////////////////////////////////////////////////////////////////////////////////
///////////////                 Imports                    /////////////////////////
///////////////////////////////////////////////////////////////////////////////////
//Importing react
import React from 'react';

//Importing shallow and mount to test the component 
import {shallow, mount} from 'enzyme';

//Importing the component
import {Login} from './login';

//Importing the local storage mock object
import LocalStorageMock from './local-storage-mock';

//Making the global local storage to be our local storage mock object
global.localStorage = new LocalStorageMock;

/////////////////////////////////////////////////////////////////////////////////////
///////////////                 Login Test                 /////////////////////////
///////////////////////////////////////////////////////////////////////////////////
describe('Login Test', () => {
  it('renders without crashing', () => {
    const dispatch = () => {};
    shallow(<Login dispatch={dispatch}/>);
  });
});