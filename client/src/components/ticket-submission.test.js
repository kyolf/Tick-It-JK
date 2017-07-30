/////////////////////////////////////////////////////////////////////////////////////
///////////////                 Imports                    /////////////////////////
///////////////////////////////////////////////////////////////////////////////////
//Importing React
import React from 'react';

//Importing shallow and mount to test the component
import {shallow, mount} from 'enzyme';

//Importing TicketSubmission component
import {TicketSubmission} from './ticket-submission';

//Importing the actions
import {submitTicket, changeNavButton, CHANGE_NAV_BUTTON} from '../actions';

//Importing the local storage mock object
import LocalStorageMock from './local-storage-mock';

//Making the global local storage to be our local storage mock object
global.localStorage = new LocalStorageMock;

/////////////////////////////////////////////////////////////////////////////////////
///////////////                 Ticket Submission          /////////////////////////
///////////////////////////////////////////////////////////////////////////////////

describe('Ticket Submission Test', () => {
  it('Ticket Submission Smoke Test', () => {
    const dispatch = jest.fn();
    shallow(<TicketSubmission dispatch={dispatch}/>);
  });

  it('Ticket Submission should have 3 inputs, 3 labels, 1 button, 1 form', () => {
    const dispatch = jest.fn();
    const wrapper = shallow(<TicketSubmission dispatch={dispatch}/>);
    expect(wrapper.find('input').length).toEqual(3);
    expect(wrapper.find('label').length).toEqual(3);
    expect(wrapper.find('button').length).toEqual(1);
    expect(wrapper.find('form').length).toEqual(1);
  });

  it('Nav Button should show TA Login Or Sign Up', () => {
    const dispatch = jest.fn();
    const wrapper = mount(<TicketSubmission dispatch={dispatch}/>);
    expect(dispatch).toHaveBeenCalledWith(changeNavButton('TA Login Or Sign Up'));
    expect(dispatch.mock.calls[0][0].type).toEqual(CHANGE_NAV_BUTTON);
    expect(dispatch.mock.calls[0][0].navButtonText).toEqual('TA Login Or Sign Up');
    expect(dispatch.mock.calls.length).toEqual(1);
  });

  it('Should dispatch a submitTicket on form submission', () => {
    const dispatch = jest.fn();
    const wrapper = mount(<TicketSubmission dispatch={dispatch}/>);
    const requestVal = wrapper.find('#request-submission').node.value = 'CSS Help';
    const groupVal = wrapper.find('#group-submission').node.value = 'Jamie & Kyle';
    const locationVal = wrapper.find('#location-submission').node.value = 'SH';
    wrapper.find('button').simulate('click');
    expect(dispatch.mock.calls.length).toEqual(2);
  });

  it('Should go to ticket list on form submission', () => {
    const dispatch = jest.fn();
    const wrapper = mount(<TicketSubmission dispatch={dispatch}/>);
    const requestVal = wrapper.find('#request-submission').node.value = 'CSS Help';
    const groupVal = wrapper.find('#group-submission').node.value = 'Jamie & Kyle';
    const locationVal = wrapper.find('#location-submission').node.value = 'SH';
    wrapper.find('button').simulate('click');
    const url = location.href + 'ticketlist';
    Object.defineProperty(window.location, 'href', {
      writable:true,
      value: url
    });
    expect(window.location.href).toEqual(url);
  });

  it('Ticket Submission should go to ticketlistTA if user is logged in', () => {
    localStorage.setItem('username', 'Chris');
    const dispatch = jest.fn();
    const wrapper = mount(<TicketSubmission dispatch={dispatch}/>);
    const url = location.href + 'ticketlistTA';
    Object.defineProperty(window.location, 'href', {
      writable:true,
      value: url
    });
    expect(window.location.href).toEqual(url);
  });
});


