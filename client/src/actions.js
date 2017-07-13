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

//login action
export const LOGIN = 'LOGIN';
export const login = (username, fullName, password) => ({
  type: LOGIN,
  username,
  fullName,
  password
});

export const TOGGLE_REFRESH = 'TOGGLE_REFRESH';
export const toggleRefresh = () => ({
  type: TOGGLE_REFRESH
});

/////////////////////////////////////////////////////////////////////////////////////
///////////////           Asynchronous Actions             /////////////////////////
///////////////////////////////////////////////////////////////////////////////////
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
    return dispatch(displayTickets(tickets));
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
    return dispatch(addTicket(ticket));
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
    //document.cookie=`username=${user.username}`
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

export const TOGGLE_STATUS = 'TOGGLE_STATUS';
export const toggleStatus = (name) => ({
  type: TOGGLE_STATUS,
  name
});

export const EDIT_FIELD = 'EDIT_FIELD';
export const editField = (fieldId) => ({
  type: EDIT_FIELD,
  fieldId
});


