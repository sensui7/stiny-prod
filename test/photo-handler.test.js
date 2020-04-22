const should = require("should");
const assert = require("assert");
const express = require("express");
const request = require("supertest");
const mock = require("mock-require");
const sinon = require("sinon");

const { mockRequest, mockResponse } = require('mock-req-res')

//var chai = require('chai');
//var expect = chai.expect;
const sinonChai = require('sinon-chai')
const chai = require('chai');
chai.use(sinonChai);
require('dotenv').config();

	  let databaseSpy = sinon.spy();
	  mock('../database', databaseSpy);
const handler = require('../routes/photoHandler');


const dummyReq = {
  "body": {
	"email": process.env.ADMIN_ONE
  }
};

const dummyTicket = {
  "payload": {
	"email": process.env.ADMIN_ONE
  }
}

describe("PhotoHandler", () => {
  describe("handleAddPhoto", () => {
	// Need to mock database and the verification function

	describe("When google verification succeds", () => {
	beforeEach(() => {
	  let databaseSpy = sinon.spy();
	  mock('../database', databaseSpy);
	});
	  it('should only allow admins', () => {
	    //let verifySpy = sinon.stub();
	    //mock('../routes/verifyToken', verifySpy);
	    //verifySpy.resolves(dummyTicket);
		//const { handleAddPhoto } = require("../routes/photoHandler");
	    //const handler = require("../routes/photoHandler");
	    //handleAddPhoto(dummyReq,{});
		//sinon.assert.calledOnce(verifySpy);
	  });

	  /*
	  it('should not allow unauthorized users', async() => {
		const res = mockResponse();
	    let verifySpy = sinon.stub();
	    mock('../routes/verifyToken', verifySpy);
		dummyTicket.payload.email = "bad@gmail.com";
	    verifySpy.resolves(dummyTicket);
		verifySpy.rejects("Not authorized user.");
	    //const handler = require("../routes/photoHandler");
		const { handleAddPhoto } = require("../routes/photoHandler");
	    handleAddPhoto(dummyReq,res).then(resolve => {
		  chai.expect(res.status).to.have.been.calledWith(403);
		});
	  });
	  */
	});

	it('should output an error when verification fails', () => {
	  
	});
  });
});
