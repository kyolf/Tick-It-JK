import reducer from './reducer';
import * as actions from './actions';

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

  describe('deleteTicket', () => {
    it('Should delete ticket from tickets array', () => {
      const currentState = {
        tickets: [{
          group: 'KJ',
          location: 'OWL',
          request: 'Help us please',
          status: 'Unassigned',
          deleteButton: 'Finish'
        }, {
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
    
  describe('changeNavButton', () => {
    it('Should change navigation button', () => {
      const currentState = {
        navButton: 'TA Login Or Sign Up'
      };

      const newState = reducer(currentState, actions.changeNavButton('Submit New Ticket'));

      expect(newState.navButton).toEqual('Submit New Ticket');
    });
  });



});//end of describe block