const should = require("should");
const assert = require("assert");
const express = require("express");
const request = require("supertest");
const mock = require("mock-require");
const sinon = require("sinon");
const { mockRequest, mockResponse } = require('mock-req-res')
const sinonChai = require('sinon-chai')
const chai = require('chai');
chai.use(sinonChai);
require('dotenv').config();

let verifySpy = sinon.stub();
mock('../routes/verifyToken', verifySpy);
let databaseSpy = sinon.spy();
mock('../database', databaseSpy);
let handler = require('../routes/photoHandler');

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
	  afterEach(() => {
	    verifySpy.reset();
	  });

	  it('should only allow admins', () => {
	    verifySpy.resolves(dummyTicket);
	    handler.handleAddPhoto(dummyReq, {});
		sinon.assert.calledOnce(verifySpy);
	  });

	  it('should not allow unauthorized users', async() => {
		const res = mockResponse();
		dummyTicket.payload.email = "bad@gmail.com";
	    verifySpy.resolves(dummyTicket);
		verifySpy.rejects("Not authorized user.");
	    handler.handleAddPhoto(dummyReq,res).then(resolve => {
		  chai.expect(res.status).to.have.been.calledWith(400);
		});
	  });
	});

	it('should output an error when verification fails', () => {
	  
	});
  });
});
