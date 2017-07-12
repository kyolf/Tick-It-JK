/////////////////////////////////////////////////////////////////////////////////////
///////////////                  Imports                   /////////////////////////
///////////////////////////////////////////////////////////////////////////////////
//importing the action types from actions file
import {
  DISPLAY_TICKETS,
  ADD_TICKET,
  EDIT_TICKET,
  DELETE_TICKET,
  CHANGE_NAV_BUTTON
} from './actions';

/////////////////////////////////////////////////////////////////////////////////////
///////////////                  State                     /////////////////////////
///////////////////////////////////////////////////////////////////////////////////
//Our Initial State
const initialState = {
  tickets: [{
    group: '',
    location: '',
    request: '',
    status: 'unassigned'
  }],
  navButton: 'TA Login Or Sign Up',
  submitted: false
};

/////////////////////////////////////////////////////////////////////////////////////
///////////////                  Reducer                   /////////////////////////
///////////////////////////////////////////////////////////////////////////////////
//A function that does a specific thing to the state depending on the action type
export default (state, action) => {
  state = state || initialState;
  if(action.type === ADD_TICKET){
    state =  Object.assign({}, state, {
      tickets: [...state.tickets, {
        group: action.group, 
        location: action.location, 
        request: action.request
      }]
    });
    return state;
  }
  else if(action.type === DISPLAY_TICKETS){
    state = Object.assign({}, state, {
      tickets: action.tickets
    });
    return state;
  }
  else if(action.type === EDIT_TICKET){
    state = Object.assign({}, state, {
      request: action.request
    });
    return state;
  }
  else if(action.type === DELETE_TICKET){
    if(action.index > 0){
      state = Object.assign({}, state, {
        tickets:[...state.tickets.slice(0, action.index),
          ...state.tickets.slice(action.index + 1)
        ]
      });
    }
    else if(action.index === 0){
      state = Object.assign({}, state, {
        tickets:[...state.tickets.slice(action.index + 1)]
      });
    }
    else{
      console.err('Your index is less than 0');
    }
    return state;
  }
  else if(action.type === CHANGE_NAV_BUTTON){
    state = Object.assign({}, state, {
      navButton: action.navButtonText
    });
  }

  return state;
}//end of export reducer 