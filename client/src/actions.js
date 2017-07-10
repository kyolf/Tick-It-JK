export const SUBMIT_TICKET = 'SUBMIT_TICKET';
export const submitTicket = (request, group, location) => ({
  type: SUBMIT_TICKET,
  request,
  group,
  location
});

export const EDIT_TICKET = 'EDIT_TICKET';
export const editTicket = () => ({
  type: EDIT_TICKET
});

export const DELETE_TICKET = 'DELETE_TICKET';
export const deleteTicket = () => ({
  type: DELETE_TICKET
});

