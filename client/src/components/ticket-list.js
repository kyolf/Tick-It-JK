import React from 'react';
import {connect} from 'react-redux';
import {editField, fetchTickets, fetchDeleteTicket} from '../actions';

import './ticket-list.css';

///make into list in container//

export class TicketList extends React.Component {
  
  componentWillMount() {
    this.props.dispatch(fetchTickets());
  }

  editField(field) {
    this.props.dispatch(editField(field.id, field.value));
  }

  deleteButton(ticketId, index) {
    this.props.dispatch(fetchDeleteTicket(ticketId, index));
  }

  getTicketInfo() {
    return this.props.tickets.map((item, index) => {
      return (
        <tr key={index} className="ticket-info-row">
          <td>
           <button onClick={e => this.deleteButton(item.id, index)}>Delete</button>
          </td>
          <td>
            <form>
              <input type="text" id="group" value={item.group} ref={group => this.group = group} />
              <input type="button" value="Edit" onClick={e => this.editField(this.group)} />
            </form>
          </td>
          <td>
            <form>
              <input type="text" id="location" value={item.location} ref={location => this.location = location}/>
              <input type="button" value="Edit" onClick={e => this.editField(this.location)} />
            </form>
          </td>
          <td>
            <form>
              <input type="text" id="request" value={item.request} ref={request => this.request = request} />
              <input type="button" value="Edit" onClick={e => this.editField(this.request)} />
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
            <th></th>
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
  tickets: state.tickets
});

export default connect(mapStateToProps)(TicketList);