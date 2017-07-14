import React from 'react';
import {shallow, mount} from 'enzyme';

import {TicketSubmission} from './ticket-submission';
import {submitTicket} from '../actions';
import LocalStorageMock from './local-storage-mock';

global.localStorage = new LocalStorageMock;

describe('<TicketSubmission />', () => {
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


