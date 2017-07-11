import {
  SUBMIT_TICKET,
  EDIT_TICKET,
  DELETE_TICKET,
  TOGGLE_NAV_BUTTON
} from './actions';

const initialState = {
  tickets: [{
    group: 'Kyle',
    location: 'OWL',
    request: 'Heroku Help',
    status: 'unassigned'
  }],
  navButton: 'Login',
  submitted: false
};

export default (state, action) => {
  state = state || initialState;
  if (action.type === SUBMIT_TICKET) {
    state =  Object.assign({}, state, {
      tickets: [...state.tickets, {
        group: action.group, 
        location: action.location, 
        request: action.request
      }]
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