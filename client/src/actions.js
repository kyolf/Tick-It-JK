/////////////////////////////////////////////////////////////////////////////////////
///////////////            Synchronous Actions             /////////////////////////
///////////////////////////////////////////////////////////////////////////////////
//display all tickets action
export const DISPLAY_TICKETS = 'DISPLAY_TICKETS';
export const displayTickets = (tickets) => ({
  type: DISPLAY_TICKETS,
  tickets
});

//add ticket to state action
export const ADD_TICKET = 'ADD_TICKET';
export const addTicket = (ticket) => ({
  type: ADD_TICKET,
  request: ticket.request,
  group: ticket.group,
  location: ticket.location
});

//delete ticket action
export const DELETE_TICKET = 'DELETE_TICKET';
export const deleteTicket = (index) => ({
  type: DELETE_TICKET,
  index
});

//change nav button action
export const CHANGE_NAV_BUTTON = 'CHANGE_NAV_BUTTON';
export const changeNavButton = (navButtonText) => ({
  type: CHANGE_NAV_BUTTON,
  navButtonText
});


/////////////////////////////////////////////////////////////////////////////////////
///////////////           Asynchronous Actions             /////////////////////////
///////////////////////////////////////////////////////////////////////////////////
//Send auth code for ta to check against database
export const submitSignUp = (username, password, firstname, lastname, code) => dispatch => {
  const info = {username, password, firstname, lastname, code};
  return fetch('/api/users', {
    method: 'POST',
    mode: 'cors',
    headers: new Headers({
      'Content-Type': 'application/json',
    }),
    body: JSON.stringify(info)
  })
  .then(res=>{
    if(!res.ok) {
      return Promise.reject(res.statusText);
    }
    return res.json();
  })
  .catch(err=>{
    console.error(`Send Code Error: ${err}`);
  })
}

//Get username when logging in
export const fetchUsername = () => dispatch => {
  return fetch(`/api/users/${username}`)
  .then(res=>{
    if(!res.ok) {
      return Promise.reject(res.statusText);
    }
    return res.json();
  })
  .catch(err=>{
    console.error(`Fetch Username Error: ${err}`);
  })
}


//Getting all the tickets in the database
export const fetchTickets = () => dispatch => {
  return fetch('/api/tickets')
  .then(res=>{
    if(!res.ok) {
      return Promise.reject(res.statusText);
    }
    return res.json();
  })
  .then(tickets=>{
    dispatch(displayTickets(tickets));
  })
  .catch(err=>{
    console.error(`Fetch Tickets Error: ${err}`);
  });
}

//Submitting a ticket into the database
export const submitTicket = (request, group, location) => dispatch => {
  const object = {request, group, location};
  return fetch('/api/tickets', {
    method: 'POST',
    mode: 'cors',
    headers: new Headers({
      'Content-Type': 'application/json',
    }),
    body: JSON.stringify(object)
  })
  .then(res=>{
    if(!res.ok) {
      return Promise.reject(res.statusText);
    }
    return res.json();
  })
  .then(ticket=>{
    dispatch(addTicket(ticket));
  })
  .catch(err=>{
    console.error(`Submit Ticket Error: ${err}`);
  });
}

//deleting ticket from database
export const fetchDeleteTicket = (ticketId, index) => dispatch =>{
  fetch(`/api/tickets/${ticketId}`, {
    method: 'DELETE',
    mode: 'cors'
  })
  .then(()=>{
    dispatch(deleteTicket(index));
  })
  .catch(err=>{
    console.error(`Fetch Delete Ticket Error: ${err}`);
  });
}

export const EDIT_TICKET = 'EDIT_TICKET';
export const editTicket = () => ({
  type: EDIT_TICKET
});

export const TOGGLE_STATUS = 'TOGGLE_STATUS';
export const toggleStatus = (name) => ({
  type: TOGGLE_STATUS,
  name
});

export const VALIDATE_LOGIN = 'VALIDATE_LOGIN';
export const validateLogin = (username, password) => ({
  type: VALIDATE_LOGIN
});


export const EDIT_FIELD = 'EDIT_FIELD';
export const editField = (fieldId) => ({
  type: EDIT_FIELD,
  fieldId
});


