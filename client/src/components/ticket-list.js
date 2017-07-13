/////////////////////////////////////////////////////////////////////////////////////
///////////////                  Imports                   /////////////////////////
///////////////////////////////////////////////////////////////////////////////////
//Importing React
import React from 'react';

//Importing connect wrap
import {connect} from 'react-redux';

//Importing actions that are going to be used in this file
import {editField, fetchTickets, fetchStatus, fetchDeleteTicket, changeNavButton, changeDeleteButton} from '../actions';

//Importing ticket list css file
import './ticket-list.css';

/////////////////////////////////////////////////////////////////////////////////////
///////////////               Ticket List                  /////////////////////////
///////////////////////////////////////////////////////////////////////////////////
export class TicketList extends React.Component{
  //before rendering, fetch all the tickets from the database and
  //see if there is a cookie for the username and
  //change navButton text to Submit New Ticket in the nav bar
  componentWillMount(){
    const username = localStorage.getItem('username');
    
    if(!username) {
      this.props.dispatch(changeNavButton('Submit New Ticket')); 
    } else {
        this.props.dispatch(changeNavButton('Log Out'));
        this.props.dispatch(changeDeleteButton('Take'));
    }
    this.props.dispatch(fetchTickets());
  }

  //edit a field in the ticket list
  editField(field){
    this.props.dispatch(editField(field.id, field.value));
  }

  //checks delete button text and dispatches delete or take 
  checkDeleteButtonText(e, ticketId, index){
    console.log('from line 42', this.props.tickets);
    if(this.props.tickets[index].deleteButton === 'Finish'){
      console.log('this is the deleteButton', this.props.tickets[index].deleteButton)
      this.deleteButton(e, ticketId, index);
    } else {
      this.takeButton(e, ticketId, index, 'Finish');
    }
  }

  //delete a ticket from the database and state
  deleteButton(e, ticketId, index){
    e.preventDefault();
    this.props.dispatch(fetchDeleteTicket(ticketId, index));
  }

  //assigns username to ticket status 
  takeButton(e, ticketId, index, deleteText){
    e.preventDefault();
    this.props.dispatch(fetchStatus(ticketId, index, deleteText));
  }


  //make a row for each document in our database
  getTicketInfoTable(){
    return this.props.tickets.map((item, index) => {
      return (
        <tr key={index} className="ticket-info-row">
          <td>
           <button onClick={e => this.checkDeleteButtonText(e, item.id, index)}>{this.props.deleteButton}</button>
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
  
  //make ticket list for mobile view
  getTicketInfoMobile() {
    return this.props.tickets.map((item, index) => {
      console.log('these are the tickets', item);
      return (
        <div key={index} className="tickets-container hide-when-large">
          <ul className="field-labels">
            <li className="field-label">Name</li>
            <li className="field-label">Request</li>
            <li className="field-label">Location</li>
            <li className="field-label">Status</li>
          </ul>
          <form className="ticket-inputs">
            <input type="text" id="group" value={item.group} ref={group => this.group = group} />
            <input type="text" id="request" value={item.request} ref={request => this.request = request} />
            <input type="text" id="location" value={item.location} ref={location => this.location = location}/>
            <input type="text" className="status" value={item.status} />
            <button className="delete-button" onClick={e => this.checkDeleteButtonText(e, item.id, index)}>{item.deleteButton}</button>
          </form>
          <div className="edit-buttons">
            <button className="edit-button" onClick={e => this.editField(this.group)}>Edit</button>
            <button className="edit-button" onClick={e => this.editField(this.request)}>Edit</button>
            <button className="edit-button" onClick={e => this.editField(this.location)}>Edit</button>
          </div>
        </div>
      )
    });
  }

  //render the ticket list table
  render(){
    return (
      <div>
        <table className="ticket-table hide-when-small">
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
            {this.getTicketInfoTable()}
          </tbody>
        </table>
          {this.getTicketInfoMobile()}
      </div>
    )
  }
}

/////////////////////////////////////////////////////////////////////////////////////
///////////////       Making Connect Wrap Around Ticket List      //////////////////
///////////////////////////////////////////////////////////////////////////////////
//setting state.tickets, state.username, state.password, state.fullName
//to the ticket, username, fullname, password prop that is passed in the connect wrap
const mapStateToProps = state => ({
  tickets: state.tickets,
  username: state.username,
  fullName: state.fullName,
  password: state.password,
  isRefreshed: state.isRefreshed,
});

//exporting a connect wrap that is wrapped around TicketList
//with the tickets prop and default dispatch prop
export default connect(mapStateToProps)(TicketList);