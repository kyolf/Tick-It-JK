'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
// const faker = require('faker');

// const mongoose = require('mongoose');
const {closeServer,runServer,app} = require('../index.js');


chai.use(chaiHttp);

/////////////////////////////////////////////////////////////////////////////////////
///////////////              Sending static file test               ////////////////
///////////////////////////////////////////////////////////////////////////////////
//Test that tests if index.html is sent to client
describe('Testing root endpoint',function(){
  before(function(){
    return runServer();
  });

  after(function(){
    return closeServer();
  });

  it('should verify you hit root url', function(){
    return chai.request(app)
      .get('/')
      .then(res => {
        res.should.be.status(200);
      });
  });
});
