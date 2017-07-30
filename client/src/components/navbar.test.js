/////////////////////////////////////////////////////////////////////////////////////
///////////////                  Imports                   /////////////////////////
///////////////////////////////////////////////////////////////////////////////////
//Importing React
import React from 'react';

//Importing shallow and mount 
import{shallow, mount} from 'enzyme';

//Importing the Navbar default class with no wrap
import {Navbar} from './navbar';

//Importing the local storage mock object
import LocalStorageMock from './local-storage-mock';

//Making the global local storage to be our local storage mock object
global.localStorage = new LocalStorageMock;

/////////////////////////////////////////////////////////////////////////////////////
///////////////                 Nav Bar Test               /////////////////////////
///////////////////////////////////////////////////////////////////////////////////
describe('Nav Bar Tests', () => {
  it('Nav Bar Smoke Test', () => {
    const dispatch = jest.fn();
    const navButton = 'Login';
    shallow(<Navbar dispatch={dispatch} navButton={navButton}/>);
  });

  it('Nav Bar Title Test', () => {
    const dispatch = jest.fn();
    const navButton = 'Login';
    const wrapper = shallow(<Navbar dispatch={dispatch} navButton={navButton}/>);
    expect(wrapper.find('Link').length).toEqual(2);
    expect(wrapper.find('.title').text()).toEqual('Tick-it');
  });

  it('Nav Bar Login Test', () => {
    const dispatch = jest.fn();
    const navButton = 'Login';
    const wrapper = shallow(<Navbar dispatch={dispatch} navButton={navButton}/>);
    expect(wrapper.find('.nav-button').text()).toEqual(navButton);
  });

  it('Nav Bar Sign Up Test', () => {
    const dispatch = jest.fn();
    const navButton = 'Sign Up';
    const wrapper = shallow(<Navbar dispatch={dispatch} navButton={navButton}/>);
    expect(wrapper.find('.nav-button').text()).toEqual(navButton);
  });

  it('Nav Bar Submit New Ticket Test', () => {
    const dispatch = jest.fn();
    const navButton = 'Submit New Ticket';
    const wrapper = shallow(<Navbar dispatch={dispatch} navButton={navButton}/>);
    expect(wrapper.find('.nav-button').text()).toEqual(navButton);
  });

  it('Nav Bar TA Login Or Sign Up Test', () => {
    const dispatch = jest.fn();
    const navButton = 'TA Login Or Sign Up';
    const wrapper = shallow(<Navbar dispatch={dispatch} navButton={navButton}/>);
    expect(wrapper.find('.nav-button').text()).toEqual(navButton);
  });

  it('Nav Bar Log Out Test', () => {
    localStorage.setItem('username', 'Chris');
    localStorage.setItem('password', '123456');
    localStorage.setItem('firstName', 'Chris A');
    const dispatch = jest.fn();
    const navButton = 'Log Out';
    const wrapper = shallow(<Navbar dispatch={dispatch} navButton={navButton}/>);
    expect(wrapper.find('.nav-button').text()).toEqual(navButton);
    wrapper.find('Link').last().simulate('click');
    expect(localStorage.store).toEqual({});
  });  
});

