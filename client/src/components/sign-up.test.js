import React from 'react';
import{shallow, mount} from 'enzyme';
import {changeNavButton, submitSignUp} from '../actions';

import {SignUp} from './sign-up';

describe('<SignUp />', () => {
  it('renders without crashing', () => {
    shallow(<SignUp />);
  });


})//end of describe block
