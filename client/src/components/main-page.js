/////////////////////////////////////////////////////////////////////////////////////
///////////////                  Imports                   /////////////////////////
///////////////////////////////////////////////////////////////////////////////////
//Importing react
import React from 'react';

//Importing the Router and Route
import {BrowserRouter as Router, Route} from 'react-router-dom';

//Importing Navbar from nav bar file
import Navbar from './navbar';

//Importing Sign Up from the sign up file
import SignUp from './sign-up';

//Importing Login from the login file
import Login from './login';

//Importing Ticket List from the ticket list file
import TicketList from './ticket-list';

//Importing the Ticket Submission from the ticket submission file
import TicketSubmission from './ticket-submission';

//Importing connect wrap
import {connect} from 'react-redux';

//Importing actions from action file
// import {validateLogin} from '../actions';

//Importing the main page css file
import './main-page.css';

/////////////////////////////////////////////////////////////////////////////////////
///////////////                  Main Page                 /////////////////////////
///////////////////////////////////////////////////////////////////////////////////
export class MainPage extends React.Component{
  // getCookie(name){
  //   var value = "; " + document.cookie;
  //   var parts = value.split("; " + name + "=");
    
  //   if(parts.length == 2){
  //      return parts.pop().split(";").shift();
  //   }
  // }
  
  // //makes our route go to username ticket list
  // goToLogin(nextState,replace){
  //   const username = this.getCookie('username');
  //   console.log('login',username);
  //   // this.props.username = username;
  //   if(!username){
  //     replace({
  //       pathname: '/login'
  //     })
  //     //window.location = '/login';
  //   }
  // }

  // //makes our route go to TA ticket list
  // goToTicketList(nextState,replace){
  //   const username = this.getCookie('username');
  //   console.log('ticketlist',username);
  //   // this.props.username = username;
  //   if(username){
  //     replace({
  //       pathname: '/ticketlistTA'
  //     })
  //     //window.location = '/ticketlistTA';
  //   }
  // }

  // <Route exact path="/ticketlistTA" component={TicketList} onEnter={this.goToLogin}/>
  // <Route exact path="/login" component={Login} onEnter={this.goToTicketList}/>
  //<Route exact path="/ticketlistTA" component={this.props.username ? TicketList : Login}/>
  //renders how each page will look like and links the pages together
  render(){
    return (
      <Router>
        <div>
          <Navbar />
          <div>
            <Route exact path="/" component={TicketSubmission}/>
            <Route exact path="/ticketlist" component={TicketList}/>
            <Route exact path="/ticketlistTA" component={TicketList} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={SignUp}/>
          </div>
        </div>
      </Router>
    );
  }
}

/////////////////////////////////////////////////////////////////////////////////////
///////////////       Making Connect Wrap Around Ticket List      //////////////////
///////////////////////////////////////////////////////////////////////////////////
//setting state.username to username prop that is passed in the connect wrap
export const mapStateToProps = state => ({
  username:state.username,
  password:state.password
});

//Creates a connect wrap that wraps around MainPage with a username prop and a default dispatch prop
export default connect(mapStateToProps)(MainPage);
