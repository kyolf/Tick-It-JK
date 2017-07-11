import React from 'react';
import {submitTicket} from '../actions';
import {connect} from 'react-redux';

import './ticket-submission.css';

export class TicketSubmission extends React.Component {

  validateSubmission(event) {
    const request = this.request.value;
    const group = this.group.value;
    const location = this.location.value;
    
    if(request.length >= 2 && group.length >= 2 && location.length >= 2) {
      this.props.dispatch(submitTicket(request, group, location));
      window.location = '/ticketlist';
    } 
  }

  render() {
    return (
      <div className="ticket-container">
        <form className="form-container" >
          <label htmlFor="request">Request</label>
          <input type="text" id="request" name="request" placeholder="Enter request here" 
            minLength="2" required ref={request => this.request = request}/>
          <label htmlFor="group">Group Collaborator</label>
          <input type="text" id="group" name="group" placeholder="Enter team member names"
            minLength="2" required ref={group => this.group = group}/>
          <label htmlFor="location">Meeting Location</label>
          <input type="text" id="location" name="location" placeholder="Screenhero or OWL Link"
            minLength="2" required ref={location => this.location = location}/>
          <button type="button" onClick={e => this.validateSubmission(e)}>Submit Ticket</button>
        </form>
      </div>
    );
  }
}

export default connect()(TicketSubmission);

