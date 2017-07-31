/////////////////////////////////////////////////////////////////////////////////////
///////////////                  Imports                   /////////////////////////
///////////////////////////////////////////////////////////////////////////////////
//Importing all actions from actions gile
import * as actions from './actions';

/////////////////////////////////////////////////////////////////////////////////////
///////////////               Display Tickets              /////////////////////////
///////////////////////////////////////////////////////////////////////////////////
describe('Display Tickets', ()=>{
  it('should return the action', ()=>{
    const tickets= [{
      group: 'hi',
      location: 'sh',
      request: '1234',
      status: 'Unassigned',
      deleteButton: 'Finish'
    }];
    const text = 'Take';

    const action = actions.displayTickets(tickets, text);
    expect(action.type).toEqual(actions.DISPLAY_TICKETS);
    expect(action.tickets).toEqual(tickets);
    expect(action.text).toEqual(text);
  });
});

/////////////////////////////////////////////////////////////////////////////////////
///////////////                Add Tickets                 /////////////////////////
///////////////////////////////////////////////////////////////////////////////////
describe('Add Ticket', ()=>{
  it('should return the action', ()=>{
    const ticket = {
      group: 'hi',
      location: 'sh',
      request: '1234',
      status: 'Unassigned',
      deleteButton: 'Finish'
    }

    const action = actions.addTicket(ticket);
    expect(action.type).toEqual(actions.ADD_TICKET);
    expect(action.request).toEqual(ticket.request);
    expect(action.location).toEqual(ticket.location);
    expect(action.group).toEqual(ticket.group);
  })
})

/////////////////////////////////////////////////////////////////////////////////////
///////////////                Delete Tickets              /////////////////////////
///////////////////////////////////////////////////////////////////////////////////
describe('Delete Ticket', ()=>{
  it('should return the action', ()=>{
    const index = 1;
    
    const action = actions.deleteTicket(index);
    expect(action.type).toEqual(actions.DELETE_TICKET);
    expect(action.index).toEqual(index);    
  });
});

/////////////////////////////////////////////////////////////////////////////////////
///////////////           Change NavButton Text            /////////////////////////
///////////////////////////////////////////////////////////////////////////////////
describe('Change Nav Button', ()=>{
  it('should return the action', ()=>{
    const text = 'login';

    const action = actions.changeNavButton(text);
    expect(action.type).toEqual(actions.CHANGE_NAV_BUTTON);
    expect(action.navButtonText).toEqual(text);    
  });
});

/////////////////////////////////////////////////////////////////////////////////////
///////////////                Change Delete Text          /////////////////////////
///////////////////////////////////////////////////////////////////////////////////
describe('Delete Button Text', ()=>{
  it('should return the action', ()=>{
    const text = 'login';
    const index = 1;

    const action = actions.changeDeleteButton(text, index);
    expect(action.type).toEqual(actions.CHANGE_DELETE_BUTTON);
    expect(action.index).toEqual(index);
    expect(action.deleteButtonText).toEqual(text);    
  });
});

/////////////////////////////////////////////////////////////////////////////////////
///////////////                  Login                     /////////////////////////
///////////////////////////////////////////////////////////////////////////////////
describe('Login', ()=>{
  it('should return the action', ()=>{
    const username = 'hi';
    const password = '123456';
    const fullName = 'JJJ';

    const action = actions.login(username, fullName, password);
    expect(action.type).toEqual(actions.LOGIN);
    expect(action.username).toEqual(username);
    expect(action.fullName).toEqual(fullName);
    expect(action.password).toEqual(password);    
  });
});

/////////////////////////////////////////////////////////////////////////////////////
///////////////                  Toggle Status                     /////////////////
///////////////////////////////////////////////////////////////////////////////////
describe('ToggleStatus', ()=>{
  it('should return the action', ()=>{
    const index = 1;
    const fullName = 'JJJ';

    const action = actions.toggleStatus(fullName, index);
    expect(action.type).toEqual(actions.TOGGLE_STATUS);
    expect(action.fullName).toEqual(fullName);
    expect(action.index).toEqual(index);    
  });
});