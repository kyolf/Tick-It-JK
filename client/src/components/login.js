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
  //before rendering, change the screen to ticketlistTA if username is logged in
  //change navButton text to Sign Up in the nav bar
  componentWillMount(){
    const username = localStorage.getItem('username');
    
    if(username){
      window.location = '/ticketlistTA';
    }

    this.props.dispatch(changeNavButton('Sign Up'));
  }

  //function that sends the username and password values from login form
  logIn(event){
    event.preventDefault();
    const username = this.username.value.toLowerCase();
    const password = this.password.value;
    if(username.length >= 1 && password.length >= 6){
      this.props.dispatch(validateLogin(username, password));
    }
  }

  //renders the login form
  render(){
    return (
      <div className="login-container">
        {/* <p className="demo" onClick={e=>alert('User: demo\nPass: 123456')}>Are you a guest TA? If so, CLICK HERE</p> */}
         <form className="login-form" onSubmit={e => this.logIn(e)}>
          <label htmlFor="username">Username</label>
          <input type="text" id="username" name="username" placeholder="Enter username" 
            minLength="1" required ref={username => this.username = username}/>
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" placeholder="Enter password"
            minLength="6" required ref={password => this.password = password}/>
          <input type="submit" id="login-submit" className="button" value="Login" name="submit-login"/>
        </form>
        <p className="demo" onClick={e=>alert('User: demo\nPass: 123456')}>Are you a guest TA? If so, CLICK HERE</p>
      </div>
    );
  }
}

/////////////////////////////////////////////////////////////////////////////////////
///////////////     Making Connect Wrap Around Ticket Submission     ///////////////
///////////////////////////////////////////////////////////////////////////////////
//Creates a connect wrap that wraps around Login with a default dispatch prop
export default connect()(Login);