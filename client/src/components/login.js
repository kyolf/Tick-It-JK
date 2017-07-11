import React from 'react';
import {validateLogin} from '../actions';

import './login.css';

export default class Login extends React.Component {
  logIn(event) {
    event.preventDefault();
    const username = this.username.value;
    const password = this.password.value;
    this.props.dispatch(validateLogin(username, password));
  }

  render() {
    return (
      <div className="login-container">
         <form className="login-form">
            <label htmlFor="username">Username</label>
            <input type="text" id="username" name="username" placeholder="Enter username" 
              minLength="1" maxLength="20" required ref={username => this.username = username}/>
            <label htmlFor="location">Password</label>
            <input type="text" id="password" name="password" placeholder="Enter password"
              minLength="2" required ref={password => this.password = password}/>
            <input type="submit" id="login-submit" className="button" name="submit-login"
              onSubmit={e => this.logIn(e)} />
          </form>
      </div>
    );
  }
}