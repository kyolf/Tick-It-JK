import {
  SUBMIT_TICKET,
  EDIT_TICKET,
  DELETE_TICKET
} from './actions';

const initialState = {
  ticket: [{
    name: '',
    location: '',
    request: '',
    status: 'unassigned'
  }]
};

export default (state, action) => {
  state = state || initialState;
  if (action.type === SUBMIT_TICKET) {
    state = Object.assign({}, initialState, {
      name: action.name,
      location: action.location,
      request: action.request
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
      
    })
  }




}//end of export reducer 