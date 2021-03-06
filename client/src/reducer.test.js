/////////////////////////////////////////////////////////////////////////////////////
///////////////                  Imports                   /////////////////////////
///////////////////////////////////////////////////////////////////////////////////
//Importing reducer and all actions from actions file
import reducer from './reducer';

//Importing all the actions
import * as actions from './actions';

/////////////////////////////////////////////////////////////////////////////////////
///////////////               Reducer Tests              ///////////////////////////
///////////////////////////////////////////////////////////////////////////////////
describe ('Reducer', () => {
  it('should set the initial state', () => {
    const state = reducer(undefined, {type: '__UNKNOWN'});

    expect(state.tickets).toEqual([
      {group: '',
      location: '',
      request: '',
      status: 'Unassigned',
      deleteButton: 'Finish'}
    ]);
    expect(state.navButton).toEqual('TA Login Or Sign Up');
    expect(state.submitted).toEqual(false);
    expect(state.username).toEqual('');
    expect(state.fullName).toEqual('');
    expect(state.password).toEqual('');
  });

  it('should return the current state on an unknown action', () => {
    let currentState = {};
    const state = reducer(currentState, {type: '__UNKNOWN'});
    
    expect(state).toBe(currentState);
  });

/////////////////////////////////////////////////////////////////////////////////////
///////////////               Display Tickets              /////////////////////////
///////////////////////////////////////////////////////////////////////////////////
  describe('displayTickets', () => {
    it('Should display all tickets', () => {
      let currentState = {
        tickets: [{
          group: 'KJ',
          location: 'OWL',
          request: 'Help us please',
          status: 'Unassigned',
          deleteButton: 'Finish'
        }]
      };

      currentState = reducer(currentState, actions.displayTickets(currentState.tickets, 'Finish'));

      expect(currentState.tickets[0].group).toEqual('KJ');
      expect(currentState.tickets[0].location).toEqual('OWL');
      expect(currentState.tickets[0].request).toEqual('Help us please');
      expect(currentState.tickets[0].status).toEqual('Unassigned');
      expect(currentState.tickets[0].deleteButton).toEqual('Finish');
    });
  });

/////////////////////////////////////////////////////////////////////////////////////
///////////////                Add Tickets                 /////////////////////////
///////////////////////////////////////////////////////////////////////////////////
  describe('addTickets', () => {
    it('Should add ticket to tickets array', () => {
      const ticket = {
        group: 'Shibas',
        location: 'Screenhero',
        request: 'Travis assistance!',
        deleteButton: 'Finish'
      };

      const currentState = {
        tickets: [{
          group: 'KJ',
          location: 'OWL',
          request: 'Help us please',
          status: 'Unassigned',
          deleteButton: 'Finish'
        }]
      };

      const newState = reducer(currentState, actions.addTicket(ticket));

      expect(newState.tickets).toEqual([...currentState.tickets, ticket]);
    });
  });

/////////////////////////////////////////////////////////////////////////////////////
///////////////                Delete Tickets              /////////////////////////
///////////////////////////////////////////////////////////////////////////////////
  describe('deleteTicket', () => {
    it('Should delete ticket from tickets array', () => {
      const currentState = {
        tickets: [{
          group: 'KJ',
          location: 'OWL',
          request: 'Help us please',
          status: 'Unassigned',
          deleteButton: 'Finish'
        }, 
        {
          group: 'Students',
          location: 'Screenhero',
          request: 'Need assistance with everything',
          status: 'Unassigned',
          deleteButton: 'Finish'
        }]
      };

      const newState = reducer(currentState, actions.deleteTicket(1));

      expect(newState.tickets).toEqual([currentState.tickets[0]]);        
    });
  });

/////////////////////////////////////////////////////////////////////////////////////
///////////////           Change NavButton Text            /////////////////////////
///////////////////////////////////////////////////////////////////////////////////
  describe('changeNavButton', () => {
    it('Should change navigation button', () => {
      const currentState = {
        navButton: 'TA Login Or Sign Up'
      };

      const newState = reducer(currentState, actions.changeNavButton('Submit New Ticket'));

      expect(newState.navButton).toEqual('Submit New Ticket');
    });
  });

/////////////////////////////////////////////////////////////////////////////////////
///////////////                Change Delete Text          /////////////////////////
///////////////////////////////////////////////////////////////////////////////////
  describe('changeDeleteButton', () => {
    it('Should change delete button of specific ticket', () => {
      const currentState = {
        tickets: [{
          group: 'KJ',
          location: 'OWL',
          request: 'Help us please',
          status: 'Unassigned',
          deleteButton: 'Finish'
        }, 
        {
          group: 'Students',
          location: 'Screenhero',
          request: 'Need assistance with everything',
          status: 'Unassigned',
          deleteButton: 'Finish'
        }]
      };

      const newState = reducer(currentState, actions.changeDeleteButton('Take', 0));

      expect(newState.tickets[0].deleteButton).toEqual('Take');
    });
  });

/////////////////////////////////////////////////////////////////////////////////////
///////////////                  Login                     /////////////////////////
///////////////////////////////////////////////////////////////////////////////////
  describe('login', () => {
    it('Should keep track of user login data in state', () => {
      const currentState = {
        username: '',
        fullName: '',
        password: ''
      };

      const newState = reducer(currentState, actions.login('Rosauv', 'C. Angelico', 'alices'));

      expect(newState.username).toEqual('Rosauv');
      expect(newState.fullName).toEqual('C. Angelico');
      expect(newState.password).toEqual('alices');
    });
  });

/////////////////////////////////////////////////////////////////////////////////////
///////////////                  Toggle Status                     /////////////////
///////////////////////////////////////////////////////////////////////////////////
  describe('toggleStatus', () => {
    it('Should change status of ticket to full name of TA who took it', () => {
      const currentState = {
        tickets: [{
          group: 'KJ',
          location: 'OWL',
          request: 'Help us please',
          status: 'Unassigned',
          deleteButton: 'Finish'
        }, 
        {
          group: 'Students',
          location: 'Screenhero',
          request: 'Need assistance with everything',
          status: 'Unassigned',
          deleteButton: 'Finish'
        }],
        fullName: 'C. Angelico'
      };

      const newState = reducer(currentState, actions.toggleStatus(currentState.fullName, 0));

      expect(newState.tickets[0].status).toEqual('C. Angelico');
    });
  });
});