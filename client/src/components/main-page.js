import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';

import Navbar from './navbar';
import SignUp from './sign-up';
import Login from './login';
import TicketList from './ticket-list';
import TicketSubmission from './ticket-submission';

import './main-page.css';

export default class MainPage extends React.Component {

  render() {
    return (
      <Router>
        <div>
          <Navbar />
          <div>
            <Route exact path="/" component={TicketSubmission}/>
            <Route exact path="/ticketlist" component={TicketList}/>
            <Route exact path="/login" component={Login}/>
            <Route exact path="/signup" component={SignUp}/>
          </div>
        </div>
      </Router>
    );
  }
}


