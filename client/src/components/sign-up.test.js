/////////////////////////////////////////////////////////////////////////////////////
///////////////                  Imports                   /////////////////////////
///////////////////////////////////////////////////////////////////////////////////
//Importing React
import React from 'react';

//Importing shallow and mount 
import{shallow, mount} from 'enzyme';

//Importing actions used in sign up
import {changeNavButton, CHANGE_NAV_BUTTON} from '../actions';

//Importing the SignUp default class with no wrap
import {SignUp} from './sign-up';

/////////////////////////////////////////////////////////////////////////////////////
///////////////                 Sign Up Test               /////////////////////////
///////////////////////////////////////////////////////////////////////////////////
describe('<SignUp />', () => {
  it('renders without crashing', () => {
    const dispatch = jest.fn();
    shallow(<SignUp dispatch={dispatch}/>);
  });

  it('Sign Up have 5 labels and 5 inputs and 1 button', () => {
    const dispatch = jest.fn();
    const wrapper = shallow(<SignUp dispatch={dispatch}/>);
    expect(wrapper.find('input').length).toEqual(5);
    expect(wrapper.find('label').length).toEqual(5);
    expect(wrapper.find('button').length).toEqual(1);
  });

  it('Sign Up has a form', () => {
    const dispatch = jest.fn();
    const wrapper = shallow(<SignUp dispatch={dispatch}/>);
    expect(wrapper.find('form').length).toEqual(1);
  });

  it('Once Sign Up is clicked, it should submit once all values are filled', () => {
    const dispatch = jest.fn();
    const wrapper = mount(<SignUp dispatch={dispatch}/>);
    wrapper.find('#firstname').value = 'hi';
    wrapper.find('#lastname').value = 'kek';
    wrapper.find('#username').value = 'Jamie';
    wrapper.find('#password').value = '123456';
    wrapper.find('#ta-auth-code').value = 'ethos';
    wrapper.find('button').simulate('click');
    expect(dispatch).toHaveBeenCalled();
  });

  it('Sign Up should have a login nav button', () => {
    const dispatch = jest.fn();
    const wrapper = mount(<SignUp dispatch={dispatch}/>);
    expect(dispatch).toHaveBeenCalledWith(changeNavButton('Login'));
    expect(dispatch.mock.calls[0][0].type).toEqual(CHANGE_NAV_BUTTON);
  });
});//end of describe block
