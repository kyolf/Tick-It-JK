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

//user object
const USER = {
  username: 'dev',
  firstName: 'Jamie',
  lastName: 'Is Scared',
  type: 'TA',
  password: '123456'
};

//Making a Dummy User into our database
function seedUser(){
  const newUser = {
    username: USER.username,
    firstName: USER.firstName,
    lastName: USER.lastName,
    type: USER.type,
  };
  return User
    .hashPassword(USER.password)
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
      request: faker.lorem.paragraph(),
      location: faker.internet.domainName(),
      group: faker.name.firstName(),
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

  describe.skip('Ticket Get endpoint', ()=>{
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

  describe.skip('Ticket Post endpoint',()=>{
    it('Posted object should be in database', ()=>{
      let ticket;
      const newTicket = {
        request: 'Help',
        location: 'SH',
        group: 'Jamie'
      };

      return chai
        .request(app)
        .post('/api/tickets')
        .send(newTicket)
        .then(res=>{
          res.should.be.json;
          res.should.be.status(201);
          res.body.should.be.a('object');
          res.body.should.include.keys(['request', 'location', 'group', 'status']);
          res.body.status.should.equal('Unassigned');
          res.body.request.should.equal(newTicket.request);
          res.body.location.should.equal(newTicket.location);
          res.body.group.should.equal(newTicket.group);
          ticket = res.body;
          return Ticket
          .findById(res.body.id)
          .exec();
        })
        .then(ticketDB=>{
          ticketDB.id.should.equal(ticket.id);
          ticketDB.request.should.equal(ticket.request);
          ticketDB.location.should.equal(ticket.location);
          ticketDB.group.should.equal(ticket.group);
          ticketDB.status.should.equal(ticket.status);
        });
    });

    it('will not allow us to add to database if missing request field', ()=>{
      const newTicket = {
        location: 'SH',
        group: 'Jamie'
      };

      return chai
        .request(app)
        .post('/api/tickets')
        .send(newTicket)
        .catch(res=>{
          res.should.have.status(400);
        });
    });

    it('will not allow us to add to database if missing location field', ()=>{
      const newTicket = {
        request: 'hi',
        group: 'Jamie'
      };

      return chai
        .request(app)
        .post('/api/tickets')
        .send(newTicket)
        .catch(res=>{
          res.should.have.status(400);
        });
    });

    it('will not allow us to add to database if missing group field', ()=>{
      const newTicket = {
        request: 'help',
        location: 'SH'
      };

      return chai
        .request(app)
        .post('/api/tickets')
        .send(newTicket)
        .catch(res=>{
          res.should.have.status(400);
        });
    });

    it('will not allow us to add to database if empty request string', ()=>{
      const newTicket = {
        request: '',
        location: 'SH',
        group: 'Jamie'
      };

      return chai
        .request(app)
        .post('/api/tickets')
        .send(newTicket)
        .catch(res=>{
          res.should.have.status(422);
        });
    });

    it('will not allow us to add to database if empty location string', ()=>{
      const newTicket = {
        request: 'help',
        location: '  ',
        group: 'Jamie'
      };

      return chai
        .request(app)
        .post('/api/tickets')
        .send(newTicket)
        .catch(res=>{
          res.should.have.status(422);
        });
    });

    it('will not allow us to add to database if empty group string', ()=>{
      const newTicket = {
        request: 'help',
        location: 'SH',
        group: ''
      };

      return chai
        .request(app)
        .post('/api/tickets')
        .send(newTicket)
        .catch(res=>{
          res.should.have.status(422);
        });
    });

    it('will not allow us to add to database if request is less than 2 characters', ()=>{
      const newTicket = {
        request: 'a',
        location: 'SH',
        group: 'Jamie'
      };

      return chai
        .request(app)
        .post('/api/tickets')
        .send(newTicket)
        .catch(res=>{
          res.should.have.status(422);
        });
    });

    it('will not allow us to add to database if location is less than 2 characters', ()=>{
      const newTicket = {
        request: 'help',
        location: 'S',
        group: 'Jamie'
      };

      return chai
        .request(app)
        .post('/api/tickets')
        .send(newTicket)
        .catch(res=>{
          res.should.have.status(422);
        });
    });

    it('will not allow us to add to database if group is less than 2 characters', ()=>{
      const newTicket = {
        request: 'help',
        location: 'SH',
        group:'J'
      };

      return chai
        .request(app)
        .post('/api/tickets')
        .send(newTicket)
        .catch(res=>{
          res.should.have.status(422);
        });
    });  
  });

  describe.skip('Ticket Put endpoint for all users', ()=>{
    it('will allow us to update request, location, group', ()=>{
      let ticket;
      const updateTicket = {
        request: 'send help',
        location: 'OWL',
        group: 'Kyle'
      };

      return Ticket
        .findOne()
        .exec()
        .then(res=>{
          updateTicket.id = res.id;
          updateTicket.status = res.status;
          return chai
            .request(app)
            .put(`/api/tickets/${updateTicket.id}`)
            .send(updateTicket);
        })
        .then(res=>{
          res.should.be.json;
          res.should.have.status(201);
          res.body.should.be.a('object');
          res.body.should.include.keys(['id', 'request', 'location', 'group', 'status']);
          res.body.id.should.not.be.null;
          res.body.id.should.equal(updateTicket.id);
          res.body.request.should.equal(updateTicket.request);
          res.body.location.should.equal(updateTicket.location);
          res.body.group.should.equal(updateTicket.group);
          res.body.status.should.equal(updateTicket.status);
          ticket = res.body;
          return Ticket
            .findById(ticket.id)
            .exec();
        })
        .then(ticketDB=>{
          ticket.id.should.equal(ticketDB.id);
          ticket.request.should.equal(ticketDB.request);
          ticket.location.should.equal(ticketDB.location);
          ticket.group.should.equal(ticketDB.group);
          ticket.status.should.equal(ticketDB.status);
        });
    });
    
    it('will allow us to update other fieids if missing request field', ()=>{
      let ticket;
      const updateTicket = {
        location: 'SH',
        group: 'Jamie'
      };

      return Ticket
        .findOne()
        .exec()
        .then(res=>{
          updateTicket.id = res.id;
          updateTicket.status = res.status;
          return chai
            .request(app)
            .put(`/api/tickets/${updateTicket.id}`)
            .send(updateTicket);
        })
        .then(res=>{
          res.should.be.json;
          res.should.have.status(201);
          res.body.should.be.a('object');
          res.body.should.include.keys(['id', 'request', 'location', 'group', 'status']);
          res.body.id.should.not.be.null;
          res.body.id.should.equal(updateTicket.id);
          res.body.location.should.equal(updateTicket.location);
          res.body.group.should.equal(updateTicket.group);
          res.body.status.should.equal(updateTicket.status);
          ticket = res.body;
          return Ticket
            .findById(ticket.id)
            .exec();
        })
        .then(ticketDB=>{
          ticket.id.should.equal(ticketDB.id);
          ticket.request.should.equal(ticketDB.request);
          ticket.location.should.equal(ticketDB.location);
          ticket.group.should.equal(ticketDB.group);
          ticket.status.should.equal(ticketDB.status);
        });
    });  

    it('will allow us to update other fieids if missing location field', ()=>{
      let ticket;
      const updateTicket = {
        request: 'hii',
        group: 'Jamie'
      };

      return Ticket
        .findOne()
        .exec()
        .then(res=>{
          updateTicket.id = res.id;
          updateTicket.status = res.status;
          return chai
            .request(app)
            .put(`/api/tickets/${updateTicket.id}`)
            .send(updateTicket);
        })
        .then(res=>{
          res.should.be.json;
          res.should.have.status(201);
          res.body.should.be.a('object');
          res.body.should.include.keys(['id', 'request', 'location', 'group', 'status']);
          res.body.id.should.not.be.null;
          res.body.id.should.equal(updateTicket.id);
          res.body.request.should.equal(updateTicket.request);
          res.body.group.should.equal(updateTicket.group);
          res.body.status.should.equal(updateTicket.status);
          ticket = res.body;
          return Ticket
            .findById(ticket.id)
            .exec();
        })
        .then(ticketDB=>{
          ticket.id.should.equal(ticketDB.id);
          ticket.request.should.equal(ticketDB.request);
          ticket.location.should.equal(ticketDB.location);
          ticket.group.should.equal(ticketDB.group);
          ticket.status.should.equal(ticketDB.status);
        });
    });
      
    it('will allow us to update other fieids if missing group field', ()=>{
      let ticket;
      const updateTicket = {
        request: 'help me',
        location: 'SH'
      };

      return Ticket
        .findOne()
        .exec()
        .then(res=>{
          updateTicket.id = res.id;
          updateTicket.status = res.status;
          return chai
            .request(app)
            .put(`/api/tickets/${updateTicket.id}`)
            .send(updateTicket);
        })
        .then(res=>{
          res.should.be.json;
          res.should.have.status(201);
          res.body.should.be.a('object');
          res.body.should.include.keys(['id', 'request', 'location', 'group', 'status']);
          res.body.id.should.not.be.null;
          res.body.id.should.equal(updateTicket.id);
          res.body.location.should.equal(updateTicket.location);
          res.body.request.should.equal(updateTicket.request);
          res.body.status.should.equal(updateTicket.status);
          ticket = res.body;
          return Ticket
            .findById(ticket.id)
            .exec();
        })
        .then(ticketDB=>{
          ticket.id.should.equal(ticketDB.id);
          ticket.request.should.equal(ticketDB.request);
          ticket.location.should.equal(ticketDB.location);
          ticket.group.should.equal(ticketDB.group);
          ticket.status.should.equal(ticketDB.status);
        });
    });

    it('will not update database if body id is not the same as param id', ()=>{
      const updateTicket = {
        request: 'help',
        location: 'OWL',
        group: 'Kyle'
      };

      return Ticket
        .findOne()
        .exec()
        .then(res=>{
          updateTicket.id = res.id;
          updateTicket.status = res.status;
          return chai
            .request(app)
            .put('/api/tickets/hi')
            .send(updateTicket);
        })
        .catch(res=>{
          res.should.have.status(400);
        });      
    });

    it('will not update database if request field value is empty', ()=>{
      const updateTicket = {
        request: '   ',
        location: 'OWL',
        group: 'Kyle'
      };

      return Ticket
        .findOne()
        .exec()
        .then(res=>{
          updateTicket.id = res.id;
          updateTicket.status = res.status;
          return chai
            .request(app)
            .put(`/api/tickets/${updateTicket.id}`)
            .send(updateTicket);
        })
        .catch(res=>{
          res.should.have.status(422);
        });      
    });

    it('will not update database if location field value is empty', ()=>{
      const updateTicket = {
        request: 'help',
        location: ' ',
        group: 'Kyle'
      };

      return Ticket
        .findOne()
        .exec()
        .then(res=>{
          updateTicket.id = res.id;
          updateTicket.status = res.status;
          return chai
            .request(app)
            .put(`/api/tickets/${updateTicket.id}`)
            .send(updateTicket);
        })
        .catch(res=>{
          res.should.have.status(422);
        });      
    });

    it('will not update database if group field value is empty', ()=>{
      const updateTicket = {
        request: 'help',
        location: 'OWL',
        group: ''
      };

      return Ticket
        .findOne()
        .exec()
        .then(res=>{
          updateTicket.id = res.id;
          updateTicket.status = res.status;
          return chai
            .request(app)
            .put(`/api/tickets/${updateTicket.id}`)
            .send(updateTicket);
        })
        .catch(res=>{
          res.should.have.status(422);
        });      
    });

    it('will not update database if request field value is less than 2 characters', ()=>{
      const updateTicket = {
        request: 'a',
        location: 'OWL',
        group: 'Kyle'
      };

      return Ticket
        .findOne()
        .exec()
        .then(res=>{
          updateTicket.id = res.id;
          updateTicket.status = res.status;
          return chai
            .request(app)
            .put(`/api/tickets/${updateTicket.id}`)
            .send(updateTicket);
        })
        .catch(res=>{
          res.should.have.status(422);
        });      
    });

    it('will not update database if location field value is less than 2 characters', ()=>{
      const updateTicket = {
        request: 'help',
        location: 'a',
        group: 'Kyle'
      };

      return Ticket
        .findOne()
        .exec()
        .then(res=>{
          updateTicket.id = res.id;
          updateTicket.status = res.status;
          return chai
            .request(app)
            .put(`/api/tickets/${updateTicket.id}`)
            .send(updateTicket);
        })
        .catch(res=>{
          res.should.have.status(422);
        });      
    });

    it('will not update database if group field value is less than 2 characters', ()=>{
      const updateTicket = {
        request: 'aa',
        location: 'OWL',
        group: 'a'
      };

      return Ticket
        .findOne()
        .exec()
        .then(res=>{
          updateTicket.id = res.id;
          updateTicket.status = res.status;
          return chai
            .request(app)
            .put(`/api/tickets/${updateTicket.id}`)
            .send(updateTicket);
        })
        .catch(res=>{
          res.should.have.status(422);
        });      
    });
  });

  describe.skip('Ticket Put endpoint for TA user', ()=>{
    it('check update status gives correct values', ()=>{
      let ticket;
      const updateTicket = {
        status: 'Wassup'
      };

      return Ticket
        .findOne()
        .exec()
        .then(res=>{
          updateTicket.id = res.id;
          return chai
            .request(app)
            .put(`/api/tickets/${updateTicket.id}/status`)
            .auth(USER.username, USER.password)
            .send(updateTicket);
        })
        .then(res=>{
          res.should.be.json;
          res.should.have.status(201);
          res.body.should.be.a('object');
          res.body.should.include.keys(['id', 'request', 'location', 'group', 'status']);
          res.body.id.should.not.be.null;
          res.body.id.should.equal(updateTicket.id);
          res.body.status.should.equal(updateTicket.status);
          ticket = res.body;
          return Ticket
            .findById(ticket.id)
            .exec();
        })
        .then(ticketDB=>{
          ticket.id.should.equal(ticketDB.id);
          ticket.request.should.equal(ticketDB.request);
          ticket.location.should.equal(ticketDB.location);
          ticket.group.should.equal(ticketDB.group);
          ticket.status.should.equal(ticketDB.status);
        });      
    });

    it('should update only status even if I put other fields', ()=>{
      let ticket;
      const updateTicket = {
        request: 'send helpzzzzzz',
        location: 'OWLzzzzzzzzzzzzzzzz',
        group: 'Kylezzzzzzzzzzzzzz',
        status: 'Wassupz'
      };

      return Ticket
        .findOne()
        .exec()
        .then(res=>{
          updateTicket.id = res.id;
          return chai
            .request(app)
            .put(`/api/tickets/${updateTicket.id}/status`)
            .auth(USER.username, USER.password)
            .send(updateTicket);
        })
        .then(res=>{
          res.should.be.json;
          res.should.have.status(201);
          res.body.should.be.a('object');
          res.body.should.include.keys(['id', 'request', 'location', 'group', 'status']);
          res.body.id.should.not.be.null;
          res.body.id.should.equal(updateTicket.id);
          res.body.request.should.not.equal(updateTicket.request);
          res.body.location.should.not.equal(updateTicket.location);
          res.body.group.should.not.equal(updateTicket.group);
          res.body.status.should.equal(updateTicket.status);
          ticket = res.body;
          return Ticket
            .findById(ticket.id)
            .exec();
        })
        .then(ticketDB=>{
          ticket.id.should.equal(ticketDB.id);
          ticket.request.should.equal(ticketDB.request);
          ticket.location.should.equal(ticketDB.location);
          ticket.group.should.equal(ticketDB.group);
          ticket.status.should.equal(ticketDB.status);
        });
    });

    it('will not update database if body id is not the same as param id', ()=>{
      const updateTicket = {
        request: 'help',
        location: 'OWL',
        group: 'Kyle',
        status: 'rekted'
      };

      return Ticket
        .findOne()
        .exec()
        .then(res=>{
          updateTicket.id = res.id;
          return chai
            .request(app)
            .put('/api/tickets/hi/status')
            .auth(USER.username, USER.password)
            .send(updateTicket);
        })
        .catch(res=>{
          res.should.have.status(400);
        });      
    });

    it('will not update database if status is not in req.body', ()=>{
      const updateTicket = {
        request: 'help',
        location: 'OWL',
        group: 'Kyle',
      };

      return Ticket
        .findOne()
        .exec()
        .then(res=>{
          updateTicket.id = res.id;
          return chai
            .request(app)
            .put(`/api/tickets/${updateTicket.id}/status`)
            .auth(USER.username, USER.password)
            .send(updateTicket);
        })
        .catch(res=>{
          res.should.have.status(400);
        });      
    });

    it('will not update database if status field value is empty', ()=>{
      const updateTicket = {
        request: '   ',
        location: 'OWL',
        group: 'Kyle',
        status: ' '
      };

      return Ticket
        .findOne()
        .exec()
        .then(res=>{
          updateTicket.id = res.id;
          return chai
            .request(app)
            .put(`/api/tickets/${updateTicket.id}/status`)
            .auth(USER.username, USER.password)
            .send(updateTicket);
        })
        .catch(res=>{
          res.should.have.status(422);
        });      
    });

    it('will not update database if status field value is greater than 40 characters', ()=>{
      const updateTicket = {
        request: '   ',
        location: 'OWL',
        group: 'Kyle',
        status: 'wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww'
      };

      return Ticket
        .findOne()
        .exec()
        .then(res=>{
          updateTicket.id = res.id;
          return chai
            .request(app)
            .put(`/api/tickets/${updateTicket.id}/status`)
            .auth(USER.username, USER.password)
            .send(updateTicket);
        })
        .catch(res=>{
          res.should.have.status(422);
        });      
    });

    it('will not update status if wrong password', ()=>{
      let ticket;
      const updateTicket = {
        status: 'Wassup'
      };

      return Ticket
        .findOne()
        .exec()
        .then(res=>{
          updateTicket.id = res.id;
          return chai
            .request(app)
            .put(`/api/tickets/${updateTicket.id}/status`)
            .auth(USER.username, faker.name.firstName())
            .send(updateTicket);
        })
        .catch(res=>{
          res.should.have.status(401);
        });   
    });
      
    it('will not update status if wrong username', ()=>{
      let ticket;
      const updateTicket = {
        status: 'Wassup'
      };

      return Ticket
        .findOne()
        .exec()
        .then(res=>{
          updateTicket.id = res.id;
          return chai
            .request(app)
            .put(`/api/tickets/${updateTicket.id}/status`)
            .auth(faker.name.firstName(), USER.password)
            .send(updateTicket);
        })
        .catch(res=>{
          res.should.have.status(401);
        });   
    });
      
    it('will not update status if no authentication is provided', ()=>{
      let ticket;
      const updateTicket = {
        status: 'Wassup'
      };

      return Ticket
        .findOne()
        .exec()
        .then(res=>{
          updateTicket.id = res.id;
          return chai
            .request(app)
            .put(`/api/tickets/${updateTicket.id}/status`)
            .send(updateTicket);
        })
        .catch(res=>{
          res.should.have.status(401);
        });   
    });
      
    it('will not update status if wrong password and username', ()=>{
      let ticket;
      const updateTicket = {
        status: 'Wassup'
      };

      return Ticket
        .findOne()
        .exec()
        .then(res=>{
          updateTicket.id = res.id;
          return chai
            .request(app)
            .put(`/api/tickets/${updateTicket.id}/status`)
            .auth(faker.name.firstName(), faker.name.firstName())
            .send(updateTicket);
        })
        .catch(res=>{
          res.should.have.status(401);
        });   
    }); 
  });

  describe.skip('Ticket Delete endpoint', ()=>{
    it('will delete ticket from database', ()=>{
      let ticket;

      return Ticket
        .findOne()
        .exec()
        .then(res=>{
          ticket = res;
          return chai
            .request(app)
            .delete(`/api/tickets/${res.id}`);
        })
        .then(res=>{
          res.should.have.status(204);
          return Ticket
            .findById(ticket.id)
            .exec();
        })
        .then(deleted=>{
          should.not.exist(deleted);
        });
    });
  });  
});

/////////////////////////////////////////////////////////////////////////////////////
///////////////                 User Tests Get Post                 ////////////////
///////////////////////////////////////////////////////////////////////////////////
describe('User API resource', ()=>{
  before(()=>{
    return runServer(PORT, TEST_DATABASE_URL);
  });

  beforeEach(()=>{
    return seedUser();
  });

  afterEach(()=>{
    return tearDownDb();
  });

  after(()=>{
    return closeServer();
  });

  describe('Get All Users Endpoint', ()=>{
    it('Allows you to get all user from database', ()=>{
      let users;

      return chai
        .request(app)
        .get('/api/users')
        .then(res=>{
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.be.a('array');
          res.body.should.have.length.of.at.least(1);
          users = res.body;
          return User
            .find()
            .count()
            .exec();
        })
        .then(count=>{
          count.should.equal(users.length);
        });
    });

    it('Allows you to get all the right user data', ()=>{
      let users;

      return chai
        .request(app)
        .get('/api/users')
        .then(res=>{
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.be.a('array');
          res.body.should.have.length.of.at.least(1);
          res.body[0].should.include.keys('id', 'fullName', 'username', 'type');
          users = res.body[0];
          return User
            .find()
            .exec();
        })
        .then(userList=>{
          const [firstName, lastName, lastName2] = users.fullName.split(' ');
          userList[0].firstName.should.equal(firstName);
          userList[0].lastName.should.equal(`${lastName} ${lastName2}`);
          userList[0].type.should.equal(users.type);
          userList[0].username.should.equal(users.username);
        });
    });
  });
  
});