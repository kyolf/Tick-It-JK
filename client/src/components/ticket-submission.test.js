import React from 'react';
import {shallow, mount} from 'enzyme';

import {TicketSubmission} from './ticket-submission';
import {submitTicket} from '../actions';

describe('<TicketSubmission />', () => {
  it('renders without crashing', () => {
    // shallow(<TicketSubmission />);
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


