'use strict';

/////////////////////////////////////////////////////////////////////////////////////
///////////////                  Imports                   /////////////////////////
///////////////////////////////////////////////////////////////////////////////////
//Importing Express
const express = require('express');
const userRouter = express.Router();

//Importing the model
const {User}= require('../models/model_users');
/////////////////////////////////////////////////////////////////////////////////////
///////////////                  Get Users                 /////////////////////////
///////////////////////////////////////////////////////////////////////////////////
//Getting all users that exist
userRouter.get('/',(req,res)=>{
  let message = '';
  User
  .find()
  .exec()
  .then(users=>{
    res.json(users.map(user=>user.apiRepr()));
  })
  .catch(err=>{
    message = 'Internal Server Error (Get Users)';
    console.err(`Get User Error: ${err}`);
    res.status(500).json({message});
  });
});

/////////////////////////////////////////////////////////////////////////////////////
///////////////                  Post Users                /////////////////////////
///////////////////////////////////////////////////////////////////////////////////
//Adding User into the database
userRouter.post('/',(req,res)=>{
  const addUserFields = {};
  const requiredFields = ['username','password','firstName','lastName'];
  let message = '';

  requiredFields.map(field =>{
    if(!(field in req.body)){
      message = `Missing field (${field}) in request body`;
      console.error(message);
      return res.status(400).json({message});
    }
    
    if(typeof req.body[field] != 'string'){
      message = `The field (${field}) is not a string`;
      console.error(message);
      return res.status(422).json({message});
    }

    const fieldLength = req.body[field].length;

    if(req.body[field].trim().length <1){
      message = `The field (${field}) is a empty string`;
      console.error(message);
      return res.status(422).json({message});
    }

    if(fieldLength > 20){
      message = `The ${field} should be at most 20 characters long. Right now it is ${fieldLength} characters long`;
      console.error(message);
      return res.status(422).json({message});
    }
  });

  let {username, password, firstName, lastName} = req.body;
  username = username.lowercase().trim();
  password = password.trim();
  firstName = firstName.trim();
  lastName = lastName.trim();

  if(password.length < 6){
    message = `The password should be at least 6 characters long. Right now it is ${password.length} characters long`;
    console.error(message);
    return res.status(400).json({message});
  }

  
});

/////////////////////////////////////////////////////////////////////////////////////
///////////////                  Exports                   /////////////////////////
///////////////////////////////////////////////////////////////////////////////////
//exporting the userRouter
module.exports={userRouter};