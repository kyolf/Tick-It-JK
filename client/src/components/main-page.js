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

/////////////////////////////////////////////////////////////////////////////////////
///////////////                  Main Page                 /////////////////////////
///////////////////////////////////////////////////////////////////////////////////
export default class MainPage extends React.Component{
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
