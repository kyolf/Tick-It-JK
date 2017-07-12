/////////////////////////////////////////////////////////////////////////////////////
///////////////                  Imports                   /////////////////////////
///////////////////////////////////////////////////////////////////////////////////
//Importing react
import React from 'react';

//Importing our connect wrap
import {connect} from 'react-redux';

//Importing actions from the actions file
import {validateLogin, changeNavButton} from '../actions';

//Importing login css file
import './login.css';

/////////////////////////////////////////////////////////////////////////////////////
///////////////                   Login                    /////////////////////////
///////////////////////////////////////////////////////////////////////////////////
export class Login extends React.Component{
  //before rendering, change navButton text to Sign Up in the nav bar
  componentWillMount(){
    this.props.dispatch(changeNavButton('Sign Up'));
  }

  //function that sends the username and password values from login form
  logIn(event){
    event.preventDefault();
    const username = this.username.value;
    const password = this.password.value;
    if(username.length >= 1 && password.length >= 6){
      this.props.dispatch(validateLogin(username, password));
      window.location = '/ticketlist';
    }
  }

  //renders the login form
  render(){
    return (
      <div className="login-container">
         <form className="login-form" onSubmit={e => this.logIn(e)}>
            <label htmlFor="username">Username</label>
            <input type="text" id="username" name="username" placeholder="Enter username" 
              minLength="1" required ref={username => this.username = username}/>
            <label htmlFor="password">Password</label>
            <input type="text" id="password" name="password" placeholder="Enter password"
              minLength="6" required ref={password => this.password = password}/>
            <input type="submit" id="login-submit" className="button" name="submit-login"/>
          </form>
      </div>
    );
  }
}

/////////////////////////////////////////////////////////////////////////////////////
///////////////     Making Connect Wrap Around Ticket Submission     ///////////////
///////////////////////////////////////////////////////////////////////////////////
//Creates a connect wrap that wraps around Login with a default dispatch prop
export default connect()(Login);