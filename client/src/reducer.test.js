import reducer from './reducer';
import {} from './actions';

describe ('Reducer', () => {
  it('should set the initial state', () => {
    const state = reducer(undefined, {type: '__UNKNOWN'});

    expect(state.tickets).toEqual([
      {group: '',
      location: '',
      request: '',
      status: 'Unassigned',
      deleteButton: 'Finish'}
    ]);
    expect(state.navButton).toEqual('TA Login Or Sign Up');
    expect(state.submitted).toEqual(false);
    expect(state.username).toEqual('');
    expect(state.fullName).toEqual('');
    expect(state.password).toEqual('');
    expect(state.isRefreshed).toEqual(false);
  });

  it('should return the current state on an unknown action', () => {
    let currentState = {};
    const state = reducer(currentState, {type: '__UNKNOWN'});
    
    expect(state).toBe(currentState);
  });

  

});//end of describe block