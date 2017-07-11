export const DISPLAY_TICKETS = 'DISPLAY_TICKETS';
export const displayTickets = (tickets) => ({
  type: DISPLAY_TICKETS,
  tickets
});

export const fetchTickets = () => dispatch => {
  return fetch('/api/tickets')
    .then (res => {
      if(!res.ok) {
        return Promise.reject(res.statusText);
      }
      return res.json();
    })
    .then (tickets => {
      dispatch(displayTickets(tickets));
    })
    
}


export const ADD_TICKET = 'ADD_TICKET';
export const addTicket = (ticket) => ({
  type: ADD_TICKET,
  request: ticket.request,
  group: ticket.group,
  location: ticket.location
});

export const submitTicket = (request, group, location) => dispatch => {
  const object = {request, group, location};
  return fetch('/api/tickets', {
    method: 'POST',
    mode: 'cors',
    headers: new Headers({
      'Content-Type': 'application/json',
    }),
    body: JSON.stringify(object)
  }).then (res => {
    if(!res.ok) {
      return Promise.reject(res.statusText);
    }
    return res.json();
  }).then(ticket => {
    dispatch(addTicket(ticket));
  }).catch(err => {
    console.error(err);
  });
}


export const EDIT_TICKET = 'EDIT_TICKET';
export const editTicket = () => ({
  type: EDIT_TICKET
});

export const DELETE_TICKET = 'DELETE_TICKET';
export const deleteTicket = () => ({
  type: DELETE_TICKET
});

export const TOGGLE_NAV_BUTTON = 'TOGGLE_NAV_BUTTON';
export const toggleNavButton = (text) => ({
  type: TOGGLE_NAV_BUTTON,
  text
});

export const VALIDATE_LOGIN = 'VALIDATE_LOGIN';
export const validateLogin = (username, password) => ({
  type: VALIDATE_LOGIN

});

export const EDIT_FIELD = 'EDIT_FIELD';
export const editField = (fieldId) => ({
  type: EDIT_FIELD,
  fieldId
})


