import React from 'react';
import {connect} from 'react-redux';
import {editField} from '../actions';

import './ticket-list.css';

///make into list in container//

export class TicketList extends React.Component {

  editField(fieldId) {
    const group = this.group.value;
    const location = this.location.value;
    const request = this.request.value;
    this.props.dispatch(editField(fieldId));
  }

  getTicketInfo() {
    return this.props.ticket.map((item, index) => {
      return (
        <tr key={index} className="ticket-info-row">
          <td id="group" ref={group => this.group = group}>
            {item.group}
              <form>
                <input type="button" value="Edit" onClick={e => this.editField(e)} />
              </form>
          </td>
          <td id="location" ref={location => this.location = location}>
            {item.location}
              <form>
                <input type="button" value="Edit" onClick={e => this.editField(e)} />
              </form>
          </td>
          <td id="request" ref={request => this.request = request}>
            {item.request}
              <form>
                <input type="button" value="Edit" onClick={e => this.editField(e)} />
              </form>
          </td>
          <td>{item.status}</td>
        </tr>
      )
    });
  }
  
  render() {
    return (
      <table className="ticket-table">
        <thead className="ticket-header">
          <tr className="ticket-row-headers">
            <th>Name</th>
            <th>Location</th>
            <th>Request</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody className="ticket-body">
          {this.getTicketInfo()}
        </tbody>
      </table>
    )
  }
}

const mapStateToProps = state => ({
  ticket: state.ticket
});

export default connect(mapStateToProps)(TicketList);