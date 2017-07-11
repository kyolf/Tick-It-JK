import {
  DISPLAY_TICKETS,
  ADD_TICKET,
  EDIT_TICKET,
  DELETE_TICKET,
  TOGGLE_NAV_BUTTON
} from './actions';

const initialState = {
  tickets: [{
    group: '',
    location: '',
    request: '',
    status: 'unassigned'
  }],
  navButton: 'Login',
  submitted: false
};

export default (state, action) => {
  state = state || initialState;
  if (action.type === ADD_TICKET) {
    state =  Object.assign({}, state, {
      tickets: [...state.tickets, {
        group: action.group, 
        location: action.location, 
        request: action.request
      }]
    });
    console.log('this is the state after adding a ticket', state);
    return state;
  }
  else if(action.type === DISPLAY_TICKETS) {
    state = Object.assign({}, state, {
      tickets: action.tickets
    });
    return state;
  }
  else if (action.type === EDIT_TICKET) {
    state = Object.assign({}, state, {
      request: action.request
    });
    return state;
  }
  else if (action.type === DELETE_TICKET) {
    
    state = Object.assign({}, state, {
      //NEED TO FILL IN
    });
  }
  else if (action.type === TOGGLE_NAV_BUTTON) {
    state = Object.assign({}, state, {
      navButton: action.text
    });
  }

  return state;
}//end of export reducer 