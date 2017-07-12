'use strict';

/////////////////////////////////////////////////////////////////////////////////////
///////////////                  Imports                   /////////////////////////
///////////////////////////////////////////////////////////////////////////////////
//Importing Path
const path = require('path');

//Importing Express
const express = require('express');
const app = express();

//Importing Morgan for logging
const morgan = require('morgan');

//Importing CORS for cors
const cors = require('cors');

//Importing bodyParser for parsing the body
const bodyParser = require('body-parser');

//Importing mongoose for linking it to mongoDB
const mongoose = require('mongoose');

//Importing password 
const passport = require('passport');
const BasicStrategy = require('passport-http').BasicStrategy;

//Importing ticket router
const {ticketRouter} = require('./router/route_tickets.js');

//Importing user router
const {userRouter} = require('./router/route_users.js');

//Importing user model
const {User}  = require('./models/model_users.js');

//Importing Database URL
const {DATABASE_URL} = require('./config');

/////////////////////////////////////////////////////////////////////////////////////
///////////////                  Promise                   /////////////////////////
///////////////////////////////////////////////////////////////////////////////////
//assigning global promise to the mongoose promise
mongoose.Promise = global.Promise;

/////////////////////////////////////////////////////////////////////////////////////
///////////////                  Basic Strategy            /////////////////////////
///////////////////////////////////////////////////////////////////////////////////
//password strategy
const basicStrategy = new BasicStrategy((username,password,callback)=>{
  let user;
  let message;
  User
  .findOne({username})
  .exec()
  .then(_user =>{
    user = _user;
    if(!user){
      message = 'Incorrect username or password';
      return callback(null,false,{message});
    }
    return user.validatePassword(password);
  })
  .then(isValid =>{
    if(!isValid){
      message = 'Incorrect username or password';
      return callback(null,false, {message});
    }
    return callback(null,user);
  });
});

/////////////////////////////////////////////////////////////////////////////////////
///////////////                  Middleware                /////////////////////////
///////////////////////////////////////////////////////////////////////////////////
//logging everything
app.use(morgan('common'));

//cors stuff
app.use(cors());

//parsing the body into a json
app.use(bodyParser.json());

//passport's basic strategy and setting the value into req.user
passport.use(basicStrategy);
app.use(passport.initialize());

/////////////////////////////////////////////////////////////////////////////////////
///////////////                  Router                    /////////////////////////
///////////////////////////////////////////////////////////////////////////////////
//Mounting /api/tickets to ticket router
app.use('/api/tickets', ticketRouter);

//Mounting /api/users to user router
app.use('/api/users', userRouter);

/////////////////////////////////////////////////////////////////////////////////////
///////////////         API Other Paths Than Above         /////////////////////////
///////////////////////////////////////////////////////////////////////////////////
// Serve the built client
app.use(express.static(path.resolve(__dirname, '../client/build')));

// Unhandled requests which aren't for the API should serve index.html so
// client-side routing using browserHistory can function
app.get(/^(?!\/api(\/|$))/, (req, res) => {
  const index = path.resolve(__dirname, '../client/build', 'index.html');
  res.sendFile(index);
});

/////////////////////////////////////////////////////////////////////////////////////
///////////////                  Server                    /////////////////////////
///////////////////////////////////////////////////////////////////////////////////
//Opening Server and Mongoose connection
let server;
function runServer(port=3001,databaseUrl=DATABASE_URL) {
  return new Promise((resolve, reject) => {
    mongoose.connect(databaseUrl,err=>{
      if(err){
        return reject(err);
      }
      server= app.listen(port,()=>{
        console.log(`App listening on port: ${port}`);
        resolve();
      })
      .on('error', err=>{
        mongoose.disconnect();
        reject(err);
      });
    });
  });
}

//Closing Server and Mongoose connection
function closeServer() {
  return mongoose.disconnect().then(()=>{
    return new Promise((resolve, reject) => {
      console.log('Closing Server');
      server.close(err => {
        if (err) {
          return reject(err);
        }
        resolve();
      });
    });
  });
}

if (require.main === module) {
  runServer();
}

/////////////////////////////////////////////////////////////////////////////////////
///////////////                  Exports                   /////////////////////////
///////////////////////////////////////////////////////////////////////////////////
//Exporting app, runServer, closeServer
module.exports = {
  app, runServer, closeServer
};
