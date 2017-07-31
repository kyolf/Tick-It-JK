/////////////////////////////////////////////////////////////////////////////////////
///////////////                  Imports                   /////////////////////////
///////////////////////////////////////////////////////////////////////////////////
//Importing React
import React from 'react';

//Importing shallow and mount 
import{shallow, mount} from 'enzyme';

//Importing the Navbar default class with no wrap
import {TicketList} from './ticket-list';

//Importing actions 
import {changeNavButton, CHANGE_NAV_BUTTON} from '../actions.js'

//Importing the local storage mock object
import LocalStorageMock from './local-storage-mock';

//Making the global local storage to be our local storage mock object
global.localStorage = new LocalStorageMock;


/////////////////////////////////////////////////////////////////////////////////////
///////////////             Ticket List Test               /////////////////////////
///////////////////////////////////////////////////////////////////////////////////
describe('Ticket List Tests', () => {
  it('Ticket List Smoke Test', () => {
    const dispatch = jest.fn();
    const tickets = [{group:'Jamie & Kyle',
                     location:'SH',
                     request:'React Help',
                     status:'Unassigned',
                     deleteButton:'Finish'}];
    const username = 'Chris';
    const fullName = 'Chris A';
    const password = '123456';
    shallow(<TicketList dispatch={dispatch} tickets={tickets} username={username} fullName={fullName} password={password}/>);
  });

  it('Ticket List should have 10 inputs, 5 buttons, 4 li, 5 th', () => {
    const dispatch = jest.fn();
    const tickets = [{group:'Jamie & Kyle',
                     location:'SH',
                     request:'React Help',
                     status:'Unassigned',
                     deleteButton:'Finish'}];
    const username = 'Chris';
    const fullName = 'Chris A';
    const password = '123456';
    const wrapper = shallow(<TicketList dispatch={dispatch} tickets={tickets} username={username} fullName={fullName} password={password}/>);
    expect(wrapper.find('input').length).toEqual(10);
    expect(wrapper.find('li').length).toEqual(4);
    expect(wrapper.find('button').length).toEqual(5);
    expect(wrapper.find('th').length).toEqual(5);
  });

  it('Ticket List has right input values', () => {
    const dispatch = jest.fn();
    const tickets = [{group:'Jamie & Kyle',
                     location:'SH',
                     request:'React Help',
                     status:'Unassigned',
                     deleteButton:'Finish'},
                    {group:'Jamie & Kyle',
                     location:'SH',
                     request:'CSS Help',
                     status:'Chris A',
                     deleteButton:'Finish'}];
    const username = 'Chris';
    const fullName = 'Chris A';
    const password = '123456';
    const wrapper = shallow(<TicketList dispatch={dispatch} tickets={tickets} username={username} fullName={fullName} password={password}/>);
    const group = wrapper.find('#group');
    const location = wrapper.find('#location');
    const request = wrapper.find('#request');
    const status = wrapper.find('.status');
    expect(group.first().prop('value')).toEqual(tickets[0].group);
    expect(group.last().prop('value')).toEqual(tickets[1].group);
    expect(location.first().prop('value')).toEqual(tickets[0].location);
    expect(location.last().prop('value')).toEqual(tickets[1].location);
    expect(request.first().prop('value')).toEqual(tickets[0].request);
    expect(request.last().prop('value')).toEqual(tickets[1].request);
    expect(status.first().prop('value')).toEqual(tickets[0].status);
    expect(status.last().prop('value')).toEqual(tickets[1].status);
  });

  it('Check Delete Button Text', () => {
    const dispatch = jest.fn();
    const tickets = [{group:'Jamie & Kyle',
                     location:'SH',
                     request:'React Help',
                     status:'Unassigned',
                     deleteButton:'Take'},
                    {group:'Jamie & Kyle',
                     location:'SH',
                     request:'CSS Help',
                     status:'Unassigned',
                     deleteButton:'Finish'}];
    const username = 'Chris';
    const fullName = 'Chris A';
    const password = '123456';
    const wrapper = mount(<TicketList dispatch={dispatch} tickets={tickets} username={username} fullName={fullName} password={password}/>);    
    const takeOrFinish = wrapper.find('.delete-button').first().text();
    const takeOrFinish1 = wrapper.find('.delete-button').last().text();
    expect(takeOrFinish).toEqual('Take');
    expect(takeOrFinish1).toEqual('Finish');
  });

  it('Check if the action is dispatched with you click on Delete Button', () => {
    const dispatch = jest.fn();
    const tickets = [{group:'Jamie & Kyle',
                     location:'SH',
                     request:'React Help',
                     status:'Unassigned',
                     deleteButton:'Take'},
                    {group:'Jamie & Kyle',
                     location:'SH',
                     request:'CSS Help',
                     status:'Unassigned',
                     deleteButton:'Finish'}];
    const username = 'Chris';
    const fullName = 'Chris A';
    const password = '123456';
    const wrapper = mount(<TicketList dispatch={dispatch} tickets={tickets} username={username} fullName={fullName} password={password}/>);
    wrapper.find('.delete-button').first().simulate('click');
    expect(dispatch.mock.calls.length).toEqual(3);     
  });

  it('No User Logged In Test', () => {
    const dispatch = jest.fn();
    const tickets = [{group:'Jamie & Kyle',
                     location:'SH',
                     request:'React Help',
                     status:'Unassigned',
                     deleteButton:'Take'},
                    {group:'Jamie & Kyle',
                     location:'SH',
                     request:'CSS Help',
                     status:'Unassigned',
                     deleteButton:'Finish'}];
    const username = 'Chris';
    const fullName = 'Chris A';
    const password = '123456';
    const wrapper = mount(<TicketList dispatch={dispatch} tickets={tickets} username={username} fullName={fullName} password={password}/>);   
    expect(dispatch).toHaveBeenCalledWith(changeNavButton('Submit New Ticket'));
    expect(dispatch.mock.calls[0][0].type).toEqual(CHANGE_NAV_BUTTON);  
    expect(dispatch.mock.calls[0][0].navButtonText).toEqual('Submit New Ticket');
    expect(dispatch.mock.calls.length).toEqual(2);      
  });

  it('User Logged In Test', () => {
    const dispatch = jest.fn();
    const tickets = [{group:'Jamie & Kyle',
                     location:'SH',
                     request:'React Help',
                     status:'Unassigned',
                     deleteButton:'Take'},
                    {group:'Jamie & Kyle',
                     location:'SH',
                     request:'CSS Help',
                     status:'Unassigned',
                     deleteButton:'Finish'}];
    const username = 'Chris';
    const fullName = 'Chris A';
    const password = '123456';
    localStorage.setItem('username', 'Chris');
    localStorage.setItem('password', '123456');
    localStorage.setItem('fullName', 'Chris A');
    const wrapper = mount(<TicketList dispatch={dispatch} tickets={tickets} username={username} fullName={fullName} password={password}/>);   
    expect(dispatch).toHaveBeenCalledWith(changeNavButton('Log Out'));
    expect(dispatch.mock.calls[0][0].type).toEqual(CHANGE_NAV_BUTTON);  
    expect(dispatch.mock.calls[0][0].navButtonText).toEqual('Log Out'); 
    expect(dispatch.mock.calls.length).toEqual(2);     
  });
});

