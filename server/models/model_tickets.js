'use strict';

/////////////////////////////////////////////////////////////////////////////////////
///////////////                  Imports                   /////////////////////////
///////////////////////////////////////////////////////////////////////////////////
/*Importing Mongoose*/
const mongoose = require('mongoose');

/////////////////////////////////////////////////////////////////////////////////////
///////////////             Ticket Schema                  /////////////////////////
///////////////////////////////////////////////////////////////////////////////////
//Ticket Schema Format
const ticketSchema = mongoose.Schema({
  request:{type:String, required:true},
  location:{type:String, required:true},
  group:{type:String, required:true},
  status:{type:String, required:true},
});

//how information should look like when apiRepr on one of the ticket documents
ticketSchema.methods.apiRepr = function(){
  return {
    id:this._id,
    request:this.request,
    location:this.location,
    group:this.group,
    status:this.status
  };
};

/////////////////////////////////////////////////////////////////////////////////////
///////////////          Linking Schemas and Exporting Models       ////////////////
///////////////////////////////////////////////////////////////////////////////////
/*Linking Ticket Schema to the Ticket Schema in our database */
const Ticket = mongoose.model('Ticket',ticketSchema);

/*Exporting the Ticket that links to our database */
module.exports = {Ticket};