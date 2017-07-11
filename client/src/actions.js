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



