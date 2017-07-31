/////////////////////////////////////////////////////////////////////////////////////
///////////////                  Imports                   /////////////////////////
///////////////////////////////////////////////////////////////////////////////////
//importing react
import React from 'react';

//importing actions from the actions file
import {submitTicket, changeNavButton} from '../actions';

//importing the connect wrap
import {connect} from 'react-redux';

//importing the ticket-submission css file
import './ticket-submission.css';

/////////////////////////////////////////////////////////////////////////////////////
///////////////            Ticket Submission               /////////////////////////
///////////////////////////////////////////////////////////////////////////////////
export class TicketSubmission extends React.Component{
  //sends user to ticketlist ta if user is logged in
  //changes navButton text to TA Login Or Sign Up in the nav bar
  componentWillMount(){
    const username = localStorage.getItem('username');
    
    if(username){
      window.location = '/ticketlistTA';
    }
    
    this.props.dispatch(changeNavButton('TA Login Or Sign Up'));
  }

  //checks if submission value are not empty before submitting
  validateSubmission(event){
    const request = this.request.value;
    const group = this.group.value;
    const location = this.location.value;
    
    if(request.length >= 2 && group.length >= 2 && location.length >= 2){
      this.props.dispatch(submitTicket(request, group, location));
      window.location = '/ticketlist';
    } 
  }

  //renders our ticket submission form
  render(){
    return (
      <div className="ticket-container">
        <form className="form-container" >
          <label htmlFor="request">Request</label>
          <input type="text" id="request-submission" name="request" placeholder="Enter request here" 
            minLength="2" required ref={request => this.request = request}/>
          <label htmlFor="group">Group Collaborators</label>
          <input type="text" id="group-submission" name="group" placeholder="Enter team member names"
            minLength="2" required ref={group => this.group = group}/>
          <label htmlFor="location">Meeting Location</label>
          <input type="text" id="location-submission" name="location" placeholder="Screenhero or OWL Link"
            minLength="2" required ref={location => this.location = location}/>
          <button type="button" className="initial-submit-button" onClick={e => this.validateSubmission(e)}>Submit Ticket</button>
        </form>
      </div>
    );
  }
}

/////////////////////////////////////////////////////////////////////////////////////
///////////////     Making Connect Wrap Around Ticket Submission     ///////////////
///////////////////////////////////////////////////////////////////////////////////
//Creates a connect wrap that wraps around Ticket Submission with a default dispatch prop
export default connect()(TicketSubmission);

