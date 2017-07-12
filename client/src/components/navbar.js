/////////////////////////////////////////////////////////////////////////////////////
///////////////                  Imports                   /////////////////////////
///////////////////////////////////////////////////////////////////////////////////
//Importing react
import React from 'react';

//Importing our connect wrap
import {connect} from 'react-redux';

//Importing Link
import {Link} from 'react-router-dom';

//Importing our nav bar css file
import './navbar.css';

/////////////////////////////////////////////////////////////////////////////////////
///////////////                  Navbar                    /////////////////////////
///////////////////////////////////////////////////////////////////////////////////
export class Navbar extends React.Component{
  //different button goes to different pages
  linkButton(){
    const lowerCaseNavButtonText = this.props.navButton.toLowerCase();

    // const TA_LOGIN_OR_SIGN_UP = 'TA Login Or Sign Up';
    const SUBMIT_NEW_TICKET = 'Submit New Ticket';
    // const LOGIN = 'Login';
    const SIGN_UP = 'Sign Up';

    // if(lowerCaseNavButtonText === TA_LOGIN_OR_SIGN_UP.toLowerCase() || lowerCaseNavButtonText === LOGIN.toLowerCase()){
    //   return (
    //     <Link to='/login'>
    //       <li className="nav-button">{props.navButton}</li>
    //     </Link>
    //   );
    // }
    if(lowerCaseNavButtonText === SUBMIT_NEW_TICKET.toLowerCase()){
      return (
        <Link to='/' style={{textDecoration: "none"}}>
          <li className="nav-button">{this.props.navButton}</li>
        </Link>
      );
    }
    else if(lowerCaseNavButtonText === SIGN_UP.toLowerCase()){
      return (
        <Link to='/signup' style={{textDecoration: "none"}}>
          <li className="nav-button">{this.props.navButton}</li>
        </Link>
      );
    }
    else{
      return (
        <Link to='/login' style={{textDecoration: "none"}}>
          <li className="nav-button">{this.props.navButton}</li>
        </Link>
      );
    }
  }

  //render the nav bar
  render(){
    return (
      <nav>
        <ul className="navbar">
          <li className="title">Tick-it</li>
          {this.linkButton()}
        </ul>
      </nav>
    )
  }
}

/////////////////////////////////////////////////////////////////////////////////////
///////////////                  Imports                   /////////////////////////
///////////////////////////////////////////////////////////////////////////////////
//setting state.tickets to the navButton prop that is passed in the connect wrap
const mapStateToProps = state => ({
  navButton: state.navButton
});

//exporting a connect wrap that is wrapped around Navbar
//with the navButton prop and default dispatch prop
export default connect(mapStateToProps)(Navbar);