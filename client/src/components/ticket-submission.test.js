/////////////////////////////////////////////////////////////////////////////////////
///////////////                 Imports                    /////////////////////////
///////////////////////////////////////////////////////////////////////////////////
//Importing React
import React from 'react';

//Importing shallow and mount to test the component
import {shallow, mount} from 'enzyme';

//Importing TicketSubmission component
import {TicketSubmission} from './ticket-submission';

//Importing the actions
import {submitTicket} from '../actions';

//Importing the local storage mock object
import LocalStorageMock from './local-storage-mock';

//Making the global local storage to be our local storage mock object
global.localStorage = new LocalStorageMock;

/////////////////////////////////////////////////////////////////////////////////////
///////////////                 Ticket Submission          /////////////////////////
///////////////////////////////////////////////////////////////////////////////////

describe('TicketSubmission Test', () => {
  it('renders without crashing', () => {
    const dispatch = () => {};
    shallow(<TicketSubmission dispatch={dispatch}/>);
  });

  it('Should dispatch a submitTicket on form submission', () => {
    // const dispatch = jest.fn();
    // const wrapper = mount(<TicketSubmission dispatch={dispatch} />);
    // const value = 'help';
    // wrapper.find('input[type="text"]').node.value = value;
    // wrapper.simulate('submit');
    // expect(dispatch).toHaveBeenCalledWith(submitTicket(value));
  })

})//end of describe block


