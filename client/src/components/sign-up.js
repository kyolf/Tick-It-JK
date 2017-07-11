import React from 'react';


import './sign-up.css';

export default class SignUp extends React.Component {

  changePage(event) {
    const firstName = this.firstname.value;
    const lastName = this.lastname.value;
    const userName = this.username.value;
    const password = this.password.value;

    if(firstName.length >= 1 && lastName.length >= 1 && userName.length >= 1 && password.length >= 6) {
      window.location = '/login';
    }
  }

  render() {
    return (
      <div className="sign-up-container">
         <form className="sign-up-form">
            <label htmlFor="username">First Name</label>
            <input type="text" id="firstname" name="firstname" placeholder="Enter first name" 
              minLength="1" required ref={firstname => this.firstname = firstname}/>
            <label htmlFor="username">Last Name</label>
            <input type="text" id="lastname" name="lastname" placeholder="Enter last name" 
              minLength="1" required ref={lastname => this.lastname = lastname}/>
            <label htmlFor="username">Username</label>
            <input type="text" id="username" name="username" placeholder="Enter username" 
              minLength="1" required ref={username => this.username = username}/>
            <label htmlFor="location">Password</label>
            <input type="text" id="password" name="password" placeholder="Enter password"
              minLength="6" required ref={password => this.password = password}/>
            <button type="button" id="login-submit" className="button" onClick={e => this.changePage(e)}>
              Sign Up
            </button>
          </form>
      </div>
    );
  }
}