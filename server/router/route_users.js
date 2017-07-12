'use strict';

/////////////////////////////////////////////////////////////////////////////////////
///////////////                  Imports                   /////////////////////////
///////////////////////////////////////////////////////////////////////////////////
//Importing Express
const express = require('express');
const userRouter = express.Router();

//Importing passport
const passport = require('passport');

//Importing the ta code
const {TA_CODE} = require('../config');

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
    return res.json(users.map(user=>user.apiRepr()));
  })
  .catch(err=>{
    message = 'Internal Server Error (Get All Users)';
    console.err(`Get User Error: ${err}`);
    return res.status(500).json({message});
  });
});

//Getting a single user that exist
userRouter.get('/:username', passport.authenticate('basic', {successRedirect: '/ticketlist', failureRedirect: '/login',session: true }), (req,res)=>{
  let message = '';

  User
  .findOne({username:req.params.username})
  .exec()
  .then(user=>{
    return res.json(user.apiRepr());
  })
  .catch(err=>{
    message = 'Internal Server Error (Get Single User)';
    console.log(`Get Single User Error: ${err}`);
    return res.status(500).json({message});
  });
});

/////////////////////////////////////////////////////////////////////////////////////
///////////////                  Post Users                /////////////////////////
///////////////////////////////////////////////////////////////////////////////////
//Adding User into the database
userRouter.post('/',(req,res)=>{
  const requiredFields = ['username','password','firstName','lastName','taCode'];
  let message = '';

  requiredFields.map(field=>{
    if(!(field in req.body)){
      message = `Missing field (${field}) in request body`;
      console.error(message);
      return res.status(400).json({message});
    }
    
    if(typeof req.body[field] !== 'string'){
      message = `The field (${field}) is not a string`;
      console.error(message);
      return res.status(422).json({message});
    }

    const fieldValue = req.body[field];

    if(fieldValue.trim().length <1){
      message = `The field (${field}) is a empty string`;
      console.error(message);
      return res.status(422).json({message});
    }
  });
  console.log(TA_CODE);
  if(req.body['taCode'] !== TA_CODE){
    message = 'You\'re not a TA are you?!?! Tsk Tsk Tsk';
    console.error(message);
    return res.status(422).json({message}); 
  }

  let {username, password,firstName,lastName} = req.body;
  username = username.toLowerCase().trim();
  password = password.trim();
  firstName = firstName.trim().substring(0,1).toUpperCase() + firstName.trim().substring(1).toLowerCase();
  lastName = lastName.trim().substring(0,1).toUpperCase() + lastName.trim().substring(1).toLowerCase();
  const type = 'TA';

  if(password.length < 6){
    message = `The password should be at least 6 characters long. Right now it is ${password.length} characters long`;
    console.error(message);
    return res.status(422).json({message});
  }

  return User
  .find({username})
  .count()
  .exec()
  .then(count=>{
    if(count>0){
      message = 'Someone is using this username';
      return res.status(422).json({message});
    }
    return User.hashPassword(password);
  })
  .then(hash=>{
    return User.create({username, password:hash, firstName, lastName, type});
  })
  .then(user=>{
    return res.status(201).json(user.apiRepr());
  }) 
  .catch(err=>{
    message = 'Internal Server Problem (Post User)';
    console.error(err);
    return res.status(500).json({message});
  }); 
});

/////////////////////////////////////////////////////////////////////////////////////
///////////////              Page Not Found                /////////////////////////
///////////////////////////////////////////////////////////////////////////////////
//Page Not Found
userRouter.use('*',(req,res)=>{
  return res.status(404).json({message:'Page Not Found'});
});


/////////////////////////////////////////////////////////////////////////////////////
///////////////                  Exports                   /////////////////////////
///////////////////////////////////////////////////////////////////////////////////
//exporting the userRouter
module.exports={userRouter};