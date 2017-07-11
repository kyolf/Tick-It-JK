'use strict';

/////////////////////////////////////////////////////////////////////////////////////
///////////////                  Imports                   /////////////////////////
///////////////////////////////////////////////////////////////////////////////////
/*Importing Mongoose*/
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

/////////////////////////////////////////////////////////////////////////////////////
///////////////               User Schema                  /////////////////////////
///////////////////////////////////////////////////////////////////////////////////
//User Schema Format
const userSchema = mongoose.Schema({
  firstName:{type:String, required:true},
  lastName:{type:String, required:true},
  username:{type:String, required:true},
  password:{type:String, required:true},
  type:{type:String, required:true}
});

//creates a fullName property for our schema
//Also splits fullName property to the firstName and lastName property for our schema 
userSchema.virtual('fullName').get(function(){
  return `${this.firstName} ${this.lastName}`.trim(); 
}).set(function(fullName){
  const [first,last] = fullName.split(' ');
  this.firstName = first;
  this.lastName = last;
});

//how information should look like when apiRepr on one of the user documents
userSchema.methods.apiRepr = function(){
  return {
    id:this._id,
    name:this.name,
    username:this.username,
    type:this.type
  };
};

//one of userSchema documents will call this function to check if the password matches
userSchema.methods.validatePassword = function(password){
  return bcrypt.compare(password,this.password);
};

//Our user object will call this to hash one of our passwords
userSchema.statics.hashPassword = function(password){
  return bcrypt.hash(password,10);
};

/////////////////////////////////////////////////////////////////////////////////////
///////////////          Linking Schemas and Exporting Models       ////////////////
///////////////////////////////////////////////////////////////////////////////////
/*Linking User Schema to the User Schema in our database */
const User = mongoose.model('User',userSchema);

/*Exporting the User that links to our database */
module.exports = {User};