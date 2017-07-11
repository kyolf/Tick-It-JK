import React from 'react';


import './sign-up.css';

export default class SignUp extends React.Component {

  render() {
    return (
      <div className="sign-up-container">
         <form className="sign-up-form">
            <label htmlFor="username">First Name</label>
            <input type="text" id="firstname" name="firstname" placeholder="Enter first name" 
              minLength="1" maxLength="20" required ref={firstname => this.firstname = firstname}/>
            <label htmlFor="username">Last Name</label>
            <input type="text" id="lastname" name="lastname" placeholder="Enter last name" 
              minLength="1" maxLength="20" required ref={lastname => this.lastname = lastname}/>
            <label htmlFor="username">Username</label>
            <input type="text" id="username" name="username" placeholder="Enter username" 
              minLength="1" maxLength="20" required ref={username => this.username = username}/>
            <label htmlFor="location">Password</label>
            <input type="text" id="password" name="password" placeholder="Enter password"
              minLength="2" required ref={password => this.password = password}/>
            <input type="submit" id="login-submit" className="button" name="submit-login"
              />
          </form>
      </div>
    );
  }
}