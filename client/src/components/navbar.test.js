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

  it('Clicking Nav Bar Title will go to Home Page', () => {
    const dispatch = jest.fn();
    const navButton = 'Login';
    const wrapper = shallow(<Navbar dispatch={dispatch} navButton={navButton}/>);
    const tickIt = wrapper.find('Link').first();
    tickIt.simulate('click');
    const url = location.href;
    Object.defineProperty(window.location, 'href', {
      writable:true,
      value: url
    });
    expect(window.location.href).toEqual(url);    
  });

  it('Nav Bar Login Test', () => {
    const dispatch = jest.fn();
    const navButton = 'Login';
    const wrapper = shallow(<Navbar dispatch={dispatch} navButton={navButton}/>);
    expect(wrapper.find('.nav-button').text()).toEqual(navButton);
  });

  it('Clicking Nav Bar Login will go to Login Page', () => {
    const dispatch = jest.fn();
    const navButton = 'Login';
    const wrapper = shallow(<Navbar dispatch={dispatch} navButton={navButton}/>);
    const login = wrapper.find('Link').last();
    login.simulate('click');
    const url = location.href + 'login';
    Object.defineProperty(window.location, 'href', {
      writable:true,
      value: url
    });
    expect(window.location.href).toEqual(url);    
  });

  it('Nav Bar Sign Up Test', () => {
    const dispatch = jest.fn();
    const navButton = 'Sign Up';
    const wrapper = shallow(<Navbar dispatch={dispatch} navButton={navButton}/>);
    expect(wrapper.find('.nav-button').text()).toEqual(navButton);
  });

  it('Clicking Nav Bar Sign Up will go to Sign Up Page', () => {
    const dispatch = jest.fn();
    const navButton = 'Sign Up';
    const wrapper = shallow(<Navbar dispatch={dispatch} navButton={navButton}/>);
    const signUp = wrapper.find('Link').last();
    signUp.simulate('click');
    const url = location.href + 'signup';
    Object.defineProperty(window.location, 'href', {
      writable:true,
      value: url
    });
    expect(window.location.href).toEqual(url);    
  });

  it('Nav Bar Submit New Ticket Test', () => {
    const dispatch = jest.fn();
    const navButton = 'Submit New Ticket';
    const wrapper = shallow(<Navbar dispatch={dispatch} navButton={navButton}/>);
    expect(wrapper.find('.nav-button').text()).toEqual(navButton);
  });

  it('Clicking Submit New Ticket will go to Home Page', () => {
    const dispatch = jest.fn();
    const navButton = 'Submit New Ticket';
    const wrapper = shallow(<Navbar dispatch={dispatch} navButton={navButton}/>);
    const submitNewTicket = wrapper.find('Link').last();
    submitNewTicket.simulate('click');
    const url = location.href;
    Object.defineProperty(window.location, 'href', {
      writable:true,
      value: url
    });
    expect(window.location.href).toEqual(url);    
  });

  it('Nav Bar TA Login Or Sign Up Test', () => {
    const dispatch = jest.fn();
    const navButton = 'TA Login Or Sign Up';
    const wrapper = shallow(<Navbar dispatch={dispatch} navButton={navButton}/>);
    expect(wrapper.find('.nav-button').text()).toEqual(navButton);
  });

  it('Clicking Nav Bar TA Login Or Sign Up will go to Login Page', () => {
    const dispatch = jest.fn();
    const navButton = 'TA Login Or Sign Up';
    const wrapper = shallow(<Navbar dispatch={dispatch} navButton={navButton}/>);
    const submitNewTicket = wrapper.find('Link').last();
    submitNewTicket.simulate('click');
    const url = location.href + 'login';
    Object.defineProperty(window.location, 'href', {
      writable:true,
      value: url
    });
    expect(window.location.href).toEqual(url);    
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
  
  it('Clicking Nav Bar Log Out will go to Login Page', () => {
    const dispatch = jest.fn();
    const navButton = 'Log Out';
    const wrapper = shallow(<Navbar dispatch={dispatch} navButton={navButton}/>);
    const submitNewTicket = wrapper.find('Link').last();
    submitNewTicket.simulate('click');
    const url = location.href + 'login';
    Object.defineProperty(window.location, 'href', {
      writable:true,
      value: url
    });
    expect(window.location.href).toEqual(url);    
  });
});

