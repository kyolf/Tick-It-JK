/////////////////////////////////////////////////////////////////////////////////////
///////////////                  Imports                   /////////////////////////
///////////////////////////////////////////////////////////////////////////////////
//importing the action types from actions file
import {
  TOGGLE_STATUS,
  DISPLAY_TICKETS,
  ADD_TICKET,
  EDIT_TICKET,
  DELETE_TICKET,
  CHANGE_NAV_BUTTON,
  CHANGE_DELETE_BUTTON,
  LOGIN
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
    status: 'Unassigned',
    deleteButton: 'Finish'
  }],
  navButton: 'TA Login Or Sign Up',
  submitted: false,
  username: '',
  fullName: '',
  password: ''
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
        request: action.request,
        deleteButton: 'Finish'
      }]
    });
  }
  else if(action.type === DISPLAY_TICKETS){
    state = Object.assign({}, state, {
      tickets: action.tickets.map(ticket=>{
        if(ticket.status === 'Unassigned'){
          return Object.assign({}, ticket, {deleteButton: action.text});
        }
        return Object.assign({}, ticket, {deleteButton: state.tickets[0].deleteButton});
      })
    });
  }
  else if(action.type === EDIT_TICKET){
    state = Object.assign({}, state, {
      request: action.request
    });
  }
  else if(action.type === DELETE_TICKET){
    state = Object.assign({}, state, {
      tickets:[...state.tickets.slice(0, action.index),
        ...state.tickets.slice(action.index + 1)
      ]
    });
  }
  else if(action.type === CHANGE_NAV_BUTTON){
    state = Object.assign({}, state, {
      navButton: action.navButtonText
    });
  }
  else if(action.type === CHANGE_DELETE_BUTTON){
    state = Object.assign({}, state, {
      tickets: [...state.tickets.slice(0, action.index),
      Object.assign(...state.tickets.slice(action.index, action.index + 1), {deleteButton: action.deleteButtonText}), 
      ...state.tickets.slice(action.index + 1)]
    });
  }
  else if(action.type === TOGGLE_STATUS){
    state = Object.assign({}, state, {
      tickets: [...state.tickets.slice(0, action.index),
      Object.assign(...state.tickets.slice(action.index, action.index + 1), {status: action.fullName}), 
      ...state.tickets.slice(action.index + 1)]
    });
  }
  else if(action.type === LOGIN){
    state = Object.assign({}, state, {
      username: action.username,
      fullName: action.fullName,
      password: action.password
    });
  }
  return state;
};