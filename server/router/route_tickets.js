'use strict';

/////////////////////////////////////////////////////////////////////////////////////
///////////////                  Imports                   /////////////////////////
///////////////////////////////////////////////////////////////////////////////////
//Importing Express
const express = require('express');
const ticketRouter = express.Router();

//Importing the ticket model
const {Ticket} = require('../models/model_tickets');

/////////////////////////////////////////////////////////////////////////////////////
///////////////                  Get Ticket                 /////////////////////////
///////////////////////////////////////////////////////////////////////////////////
//getting all the tickets
ticketRouter.get('/',(req,res)=>{
  let message = '';

  Ticket
  .find()
  .exec()
  .then(tickets=>{
    return res.json(tickets.map(ticket=>ticket.apiRepr()));
  })
  .catch(err=>{
    message = 'Internal Server Error (get all tickets)';
    console.err('Get All Tickets Error: ', err);
    return res.status(500).json({message});
  });
});

/////////////////////////////////////////////////////////////////////////////////////
///////////////               Create Ticket                /////////////////////////
///////////////////////////////////////////////////////////////////////////////////
//creating the tickets
ticketRouter.post('/',(req,res)=>{
  const ticketFields = {status:'Unassigned'};
  const requiredFields = ['request','location','group'];
  let message = '';

  requiredFields.map(field =>{ 
    if(!(field in req.body)){
      message = `Your body is missing the field: ${field}`;
      console.error(message);
      return res.status(400).json({message});
    }

    if(req.body[field].trim().length<1){
      message = `Your field (${field}) is empty`;
      console.error(message);
      return res.status(400).json({message});
    }

    if(req.body[field].trim().length<2){
      message = `Your field (${field}) needs to be at least 2 characters long`;
      console.error(message);
      return res.status(400).json({message});
    }

    ticketFields[field]=req.body[field];
  });

  const requestLength = req.body['request'].length;
  const groupMemLength = req.body['group'].length;

  if(requestLength>20){
    message = `Your request field can be 20 char long. Right now it is ${requestLength} long`;
    console.error(message);
    return res.status(400).json({message});
  }

  if(groupMemLength>40){
    message = `Your group field can be 40 char long. Right now it is ${groupMemLength} long`;
    console.error(message);
    return res.status(400).json({message});
  }

  Ticket
  .create(ticketFields)
  .then(ticket=>{
    return res.status(201).json(ticket.apiRepr());
  })
  .catch(err=>{
    message = 'Internal Server Error (Post Ticket)';
    console.error(`Post Ticket Error: ${err}`);
    return res.status(500).json({message});
  });
});

/////////////////////////////////////////////////////////////////////////////////////
///////////////               Update Ticket                /////////////////////////
///////////////////////////////////////////////////////////////////////////////////
//Updating Tickets Every User
ticketRouter.put('/:id',(req,res)=>{
  let message = '';

  if(!(req.params.id ===req.body.id)){
    message = `$req params id: ${req.params.id} does not match req body id: ${req.body.id}`;
    console.error(message);
    return res.status(400).json({message});
  }

  const updateTicket = {};
  const updateFields = ['request','location','status','group'];
  const requestLength = req.body['request'].length;
  const groupMemLength = req.body['group'].length;

  updateFields.map(field =>{
    if(field in req.body){
      if(req.body[field].length<1){
        message = `Your field (${field}) is empty`;
        console.error(message);
        return res.status(400).json({message});
      }

      if(req.body[field].trim().length<2){
        message = `Your field (${field}) needs to be at least 2 characters long`;
        console.error(message);
        return res.status(400).json({message});
      }

      if(field === 'request'){
        if(requestLength>20){
          message = `Your request field can be 20 char long. Right now it is ${requestLength} long`;
          console.error(message);
          return res.status(400).json({message});
        }
      }

      if(field === 'group'){
        if(groupMemLength>40){
          message = `Your group field can be 40 char long. Right now it is ${groupMemLength} long`;
          console.error(message);
          return res.status(400).json({message});
        }
      }

      updateTicket[field] = req.body[field];
    }
  });

  Ticket
  .findByIdAndUpdate(req.params.id, {$set: updateTicket}, {new:true})
  .exec()
  .then(ticket => {
    return res.status(201).json(ticket.apiRepr());
  })
  .catch(err=>{
    message = 'Internal server Error (update ticket)';
    console.err(`Update Ticket Error: ${err}`);
    return res.status(500).json({message});
  });
});

/////////////////////////////////////////////////////////////////////////////////////
///////////////               Delete Ticket                /////////////////////////
///////////////////////////////////////////////////////////////////////////////////
//Deleting Tickets
ticketRouter.delete('/:id',(req,res)=>{
  let message = '';

  Ticket
  .findByIdAndRemove(req.params.id)
  .exec()
  .then(ticket=>{
    res.status(204).end();
  })
  .catch(err=>{
    message = 'Internal Server Error (delete ticket)';
    console.error(`Delete Ticket Error: ${message}`);
    return res.status(500).json({message});
  });
});

/////////////////////////////////////////////////////////////////////////////////////
///////////////              Page Not Found                /////////////////////////
///////////////////////////////////////////////////////////////////////////////////
//Page Not Found
ticketRouter.use('*',(req,res)=>{
  res.status(404).json({message:'Page Not Found'});
});

/////////////////////////////////////////////////////////////////////////////////////
///////////////                  Exports                   /////////////////////////
///////////////////////////////////////////////////////////////////////////////////
//exporting the ticketRouter
module.exports={ticketRouter};