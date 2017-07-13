/////////////////////////////////////////////////////////////////////////////////////
///////////////                  Imports                   /////////////////////////
///////////////////////////////////////////////////////////////////////////////////
//Importing React
import React from 'react';

//Importing connect wrap
import {connect} from 'react-redux';

//Importing actions that are going to be used in this file
import {editField, fetchTickets, fetchDeleteTicket, changeNavButton} from '../actions';

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
    // function getCookie(name) {
    //   const value = "; " + document.cookie;
    //   const parts = value.split("; " + name + "=");
    //   if(parts.length == 2){
    //     return parts.pop().split(";").shift();
    //   }
    // }

    // const username = getCookie('username');

    // if (!username) {
    //   window.location = '/login';
    // }

    !this.props.username ? this.props.dispatch(changeNavButton('Submit New Ticket')) 
                         : this.props.dispatch(changeNavButton(`Welcome ${this.props.fullName}`));
    this.props.dispatch(fetchTickets());
  }

  //edit a field in the ticket list
  editField(field){
    this.props.dispatch(editField(field.id, field.value));
  }

  //delete a ticket from the database and state
  deleteButton(ticketId, index){
    this.props.dispatch(fetchDeleteTicket(ticketId, index));
  }

  //make a row for each document in our database
  getTicketInfo(){
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
  
  //render the ticket list table
  render(){
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

/////////////////////////////////////////////////////////////////////////////////////
///////////////       Making Connect Wrap Around Ticket List      //////////////////
///////////////////////////////////////////////////////////////////////////////////
//setting state.tickets, state.username, state.password, state.fullName
//to the ticket, username, fullname, password prop that is passed in the connect wrap
const mapStateToProps = state => ({
  tickets: state.tickets,
  username: state.username,
  fullName: state.fullName,
  password: state.password
});

//exporting a connect wrap that is wrapped around TicketList
//with the tickets prop and default dispatch prop
export default connect(mapStateToProps)(TicketList);