import React from 'react';
import {connect} from 'react-redux';
import {submitTicket} from '../actions';

import './ticket-submission.css';

export class TicketSubmission extends React.Component {
  makeTicket(event) {
    event.preventDefault();
    const request = this.request.value;
    const group = this.group.value;
    const location = this.location.value;
    this.props.dispatch(submitTicket(request, group, location));
  }

  render() {
    return (
      <div className="ticket-container">
        <form className="form-container" onSubmit={e => this.makeTicket(e)}>
          <label htmlFor="request">Request</label>
          <input type="text" id="request" name="request" placeholder="Enter request here" 
            required ref={request => this.request = request}/>
          <label htmlFor="group">Group Collaborator</label>
          <input type="text" id="group" name="group" placeholder="Enter team member names"
            required ref={group => this.group = group}/>
          <label htmlFor="location">Meeting Location</label>
          <input type="text" id="location" name="location" placeholder="Screenhero or OWL Link"
            required ref={location => this.location = location}/>
          <input type="submit" id="ticket-submit" className="button" name="submit"/>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state =>({
  

});

export default connect(mapStateToProps)(TicketSubmission);
