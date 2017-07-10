import React from 'react';
import {connect} from 'react-redux';
import './ticket-submission.css';

class TicketSubmission extends Component {
  render() {
    return (
      <div className="ticket-container">
        <h2>Request</h2>
          <form>
            <input type="text" name="request" placeholder="Enter request here" 
            required/>
          </form>
        <h2>Group Collaborators</h2>
          <form>
            <input type="text" name="group" placeholder="Enter team member names" required/>
          </form>
        <h2>Meeting Location</h2>
          <form>
            <input type="text" name="location" placeholder="Screenhero or OWL Link"/>
          </form>
        <div className="submit-button">
          <input type="submit" id="ticket-submit" className="button" name="submit"/>
        </div>
      </div>
    );
  }
}

export default TicketSubmission;
