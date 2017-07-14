/////////////////////////////////////////////////////////////////////////////////////
///////////////            Synchronous Actions             /////////////////////////
///////////////////////////////////////////////////////////////////////////////////
//display all tickets action
export const DISPLAY_TICKETS = 'DISPLAY_TICKETS';
export const displayTickets = (tickets, text) => ({
  type: DISPLAY_TICKETS,
  tickets,
  text
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

//change delete button 
export const CHANGE_DELETE_BUTTON = 'CHANGE_DELETE_BUTTON';
export const changeDeleteButton = (deleteButtonText, index) => ({
  type: CHANGE_DELETE_BUTTON,
  deleteButtonText,
  index
});

//login action
export const LOGIN = 'LOGIN';
export const login = (username, fullName, password) => ({
  type: LOGIN,
  username,
  fullName,
  password
});

//toggle status 
export const TOGGLE_STATUS = 'TOGGLE_STATUS';
export const toggleStatus = (fullName, index) => ({
  type: TOGGLE_STATUS,
  fullName,
  index
});

/////////////////////////////////////////////////////////////////////////////////////
///////////////           Asynchronous Actions             /////////////////////////
///////////////////////////////////////////////////////////////////////////////////
//Getting all the tickets in the database
export const fetchTickets = (text) => dispatch => {
  return fetch('/api/tickets')
  .then(res=>{
    if(!res.ok) {
      return Promise.reject(res.statusText);
    }
    return res.json();
  })
  .then(tickets=>{
    return dispatch(displayTickets(tickets, text));
  })
  .catch(err=>{
    console.error(`Fetch Tickets Error: ${err}`);
  });
}

//Updating status for ticket in database
export const fetchStatus = (ticketId, index, deleteText) => dispatch => {
  const fullName = localStorage.getItem('fullName');
  const username = localStorage.getItem('username');
  const password = localStorage.getItem('password');
  return fetch(`/api/tickets/${ticketId}/status`, {
    method: 'PUT',
    mode: 'cors',
    headers: new Headers({
      'Content-Type': 'application/json',
      'Authorization': `Basic ${btoa(username + ':' + password)}`
    }),
    body: JSON.stringify({id: ticketId, status: fullName})
  })
  .then(res=>{
    if(!res.ok) {
      return Promise.reject(res.statusText);
    }
    return res.json();
  })
  .then(item=>{
    dispatch(changeDeleteButton(deleteText, index));
    dispatch(toggleStatus(item.status, index));
  })
  .catch(err=>{
    console.error(`Fetch Status Error: ${err}`);
  })
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
    return dispatch(addTicket(ticket));
  })
  .catch(err=>{
    console.error(`Submit Ticket Error: ${err}`);
  });
}

//deleting ticket from database
export const fetchDeleteTicket = (ticketId, index) => dispatch =>{
  console.log('ticketId before fetch', ticketId)
  fetch(`/api/tickets/${ticketId}`, {
    method: 'DELETE',
    mode: 'cors'
  })
  .then(()=>{
    console.log('I AM HERE', ticketId);
    return dispatch(deleteTicket(index));
  })
  .catch(err=>{
    console.error(`Fetch Delete Ticket Error: ${err}`);
  });
}

//adding a user to the database if the code matches
export const submitSignUp = (username, password, firstName, lastName, taCode) => dispatch => {
  const info = {username, password, firstName, lastName, taCode};
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
  .then(res=>{ 
    window.location = '/login';
  })
  .catch(err=>{
    console.error(`Send Code Error: ${err}`);
  })
}

//gets the current user by logging in.
export const validateLogin = (username, password) => dispatch => {
  return fetch(`/api/users/${username}`, {
    method: 'GET',
    mode: 'cors',
    headers: new Headers({
      'Content-Type': 'application/json',
      'Authorization': `Basic ${btoa(username + ':' + password)}`
    })
  })
  .then(res=>{
    if(!res.ok){
      return Promise.reject(res.statusText);
    }
    return res.json();
  })
  .then(user=>{
    const [firstName, lastName] = user.fullName.split(' ');

    dispatch(login(user.username, user.fullName, password));

    localStorage.setItem('username', user.username);
    localStorage.setItem('password', password);
    localStorage.setItem('fullName', `${firstName} ${lastName.substring(0,1)}`);

    window.location =  '/ticketlistTA';
  })
  .catch(err=>{
    console.error(`Login Error: ${err}`);
  });
}

//S
export const EDIT_TICKET = 'EDIT_TICKET';
export const editTicket = () => ({
  type: EDIT_TICKET
});

export const EDIT_FIELD = 'EDIT_FIELD';
export const editField = (fieldId) => ({
  type: EDIT_FIELD,
  fieldId
});


