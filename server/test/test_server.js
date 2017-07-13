'use strict';

/////////////////////////////////////////////////////////////////////////////////////
///////////////                  Imports                   /////////////////////////
///////////////////////////////////////////////////////////////////////////////////
//Importing chai
const chai = require('chai');
const chaiHttp = require('chai-http');

//Importing faker library for random data
const faker = require('faker');

//Importing mongoose for dropping database
const mongoose = require('mongoose');

//Importing our server
const {closeServer,runServer,app} = require('../index.js');

//Importing our ticket model
const {Ticket} = require('../models/model_tickets');

//Importing our users model
const {User} = require('../models/model_users');

//Importing our database and port
const {TEST_DATABASE_URL, PORT, TA_CODE} = require('../config');

//calling chai.should() so we can use should assertion
const should = chai.should();

//allows us to simulate HTTP methods
chai.use(chaiHttp);

/////////////////////////////////////////////////////////////////////////////////////
///////////////    Creating dummy values and destroying Database    ////////////////
///////////////////////////////////////////////////////////////////////////////////
//Destroying the database
function tearDownDb(){
  return new Promise((resolve, reject) => {
    console.warn('Deleting database');
    mongoose.connection
    .dropDatabase()
    .then(result=>{
      return resolve(result);
    })
    .catch(err=>{
      return reject(err);
    });
  });
}

//Making a Dummy User into our database
function seedUser(){
  const newUser={
    username: 'dev',
    firstName: 'Jamie',
    lastName: 'Is Scared',
    type: 'TA',
    password: '123456'
  };
  return User
    .hashPassword(newUser.password)
    .then(hash=>{
      newUser.password = hash;
      return User.create(newUser);
    });
}

//Making dummy tickets in the test database
function seedTicket(){
  const seedData = [];
  for(let i = 0; i < 10; i++){
    seedData.push({
      request: faker.lorem.paragraph,
      location: faker.internet.domainName,
      group: faker.name.firstName,
      status: 'Unassigned'
    });
  }
  return Ticket.insertMany(seedData);
}

/////////////////////////////////////////////////////////////////////////////////////
///////////////              Sending static file test               ////////////////
///////////////////////////////////////////////////////////////////////////////////
//Test that tests if index.html is sent to client
describe('Testing root endpoint', ()=>{
  before(function(){
    return runServer();
  });

  after(function(){
    return closeServer();
  });

  it('should verify you hit root url', ()=>{
    return chai.request(app)
      .get('/')
      .then(res => {
        res.should.be.status(200);
      });
  });
});

/////////////////////////////////////////////////////////////////////////////////////
///////////////          Ticket Tests Get Put Post Delete           ////////////////
///////////////////////////////////////////////////////////////////////////////////
describe('Ticket API resource', ()=>{
  before(()=>{
    return runServer(PORT, TEST_DATABASE_URL);
  });

  beforeEach(()=>{
    return Promise.all([seedUser(), seedTicket()]);
  });

  afterEach(()=>{
    return tearDownDb();
  });

  after(()=>{
    return closeServer();
  });

  describe('Ticket Get endpoint', ()=>{
    it('should return all existing tickets', ()=>{
      let tickets;
      return chai
        .request(app)
        .get('/api/tickets')
        .then(res=>{
          tickets=res;
          tickets.should.be.status(200);
          tickets.body.length.should.be.at.least(1);
          return Ticket
            .find()
            .count()
            .exec();
        })
        .then(count=>{
          tickets.body.should.have.lengthOf(count);
        });
    });

    it('should check if all ticket data values are correct', ()=>{
      let tickets;
      return chai
        .request(app)
        .get('/api/tickets')
        .then(res=>{
          res.should.be.status(200);
          res.should.be.json;
          res.body.should.be.a('array');
          res.body.length.should.be.at.least(1);
          res.body.forEach(_ticket=>{
            _ticket.should.be.a('object');
            _ticket.should.include.key('id', 'request', 'location', 'group', 'status');
          });
          tickets = res.body[0];
          return Ticket
            .findById(tickets.id)
            .exec();
        })
        .then(ticket=>{
          tickets.request.should.equal(ticket.request);
          tickets.location.should.equal(ticket.location);
          tickets.group.should.equal(ticket.group);
          tickets.status.should.equal(ticket.status);
        });
    });
  });

  describe('Ticket Post endpoint',()=>{
    it('Posted object should be in database', ()=>{
      let ticket;
      const newTicket = {
        request: 'Help',
        location: 'SH',
        group:'Jamie',
      };
      return chai
        .request(app)
        .post('/api/tickets')
        .send(newTicket)
        .then(res=>{
          res.should.be.status(201);
          res.body.should.be.a('object');
          res.body.should.include.keys(['request', 'location', 'group', 'status']);
        });
    });
  });
});