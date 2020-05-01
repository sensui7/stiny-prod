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

let verifyStub = sinon.stub();
mock('../routes/verifyToken', verifyStub);
let databaseSpy = sinon.spy();
databaseSpy.connect = sinon.spy();
mock('../database', databaseSpy);
let handler = require('../routes/cookingHandler');

const dummyReq = {
  "body": {
	"email": process.env.ADMIN_ONE
  }
};

const dummyTicket = {
  "payload": {
	"email": process.env.ADMIN_ONE
  }
};

describe("CookingHandler", () => {
  describe("handleAddRecipe", () => {
    describe("When google verification occurs", () => {
	  afterEach(() => {
	    verifyStub.reset();
	  });

	  it('should not allow unauthorized users', async() => {
		const options = {
		  body: {
			email: "bad@gmail.com"
		  }
		};
		
	    const req = mockRequest(options);
		const res = mockResponse();
		const copy = {
		  payload: {
		    email: "bad@gmail.com"	
		  }
		};

		verifyStub.resolves(copy);
	    await handler.handleAddRecipe(dummyReq, res);
		chai.expect(res.status).to.have.been.calledWith(403);
	  });

      it('should output an error when verification fails', async() => {
		const options = {
		  body: {
			email: "bad@gmail.com"
		  }
		};
		
	    const req = mockRequest(options);
		const res = mockResponse(options);
		verifyStub.rejects("Not authorized user.");
		await handler.handleAddRecipe(req, res);
		chai.expect(res.status).to.have.been.calledWith(400);
	  });

      it('should add a recipe', async() => {
		let options = {
		  "body": {
			email: process.env.ADMIN_ONE,
			recipeName: "testRecipe",
			data: "{}"
		  }
		};
	    
	    verifyStub.resolves(dummyTicket);
		let res = mockResponse();
		let req = mockRequest(options);
		databaseSpy.getRecipe = sinon.spy();
		databaseSpy.addRecipe = sinon.spy();
		await handler.handleAddRecipe(req, res);
		chai.expect(res.status).to.have.been.calledWith(200);
		chai.expect(databaseSpy.addRecipe).to.have.callCount(1);
		chai.expect(databaseSpy.getRecipe).to.have.callCount(1);
	  });

      it('should not add a duplicate recipe', async() => {
		let options = {
		  "body": {
			email: process.env.ADMIN_ONE,
			recipeName: "testRecipe",
			data: "{}"
		  }
		};

		const dummyRecipe = ["test"];
	    
	    verifyStub.resolves(dummyTicket);
		let res = mockResponse();
		let req = mockRequest(options);
		databaseSpy.getRecipe = sinon.stub().returns(dummyRecipe);
		databaseSpy.addRecipe = sinon.spy();
		await handler.handleAddRecipe(req, res);
		chai.expect(res.status).to.have.been.calledWith(500);
		chai.expect(databaseSpy.addRecipe).to.have.callCount(0);
		chai.expect(databaseSpy.getRecipe).to.have.callCount(1);
	  });
	});
  });

  describe("handleGetAllRecipes", () => {
    describe("When google verification occurs", () => {
	  it('should get all the recipes', async() => {
		let res = mockResponse();
		let req = mockRequest();
		databaseSpy.getAllRecipes = sinon.stub();
		await handler.handleGetAllRecipes(req, res);
		chai.expect(res.status).to.have.been.calledWith(200);
		chai.expect(databaseSpy.getAllRecipes).to.have.callCount(1);
	  });
	});
  });

  describe("handleDeleteRecipe", () => {
    describe("When google verification occurs", () => {
	  afterEach(() => {
	    verifyStub.reset();
	  });

	  it('should not allow unauthorized users', async() => {
		const options = {
		  body: {
			email: "bad@gmail.com"
		  }
		};
		
	    const req = mockRequest(options);
		const res = mockResponse();
		const copy = {
		  payload: {
		    email: "bad@gmail.com"	
		  }
		};

		verifyStub.resolves(copy);
	    await handler.handleDeleteRecipe(dummyReq, res);
		chai.expect(res.status).to.have.been.calledWith(403);
	  });

      it('should output an error when verification fails', async() => {
		const options = {
		  body: {
			email: "bad@gmail.com"
		  }
		};
		
	    const req = mockRequest(options);
		const res = mockResponse(options);
		verifyStub.rejects("Not authorized user.");
		await handler.handleDeleteRecipe(req, res);
		chai.expect(res.status).to.have.been.calledWith(400);
	  });

      it('should delete a recipe', async() => {
		let options = {
		  "body": {
			email: process.env.ADMIN_ONE,
			recipeName: "testRecipeToDelete"
		  }
		};

		const dummyRecipes = [];
	    
	    verifyStub.resolves(dummyTicket);
		let res = mockResponse();
		let req = mockRequest(options);
		databaseSpy.getRecipe = sinon.stub().returns(dummyRecipes);
		databaseSpy.deleteRecipe = sinon.spy();
		await handler.handleDeleteRecipe(req, res);
		chai.expect(res.status).to.have.been.calledWith(200);
		chai.expect(databaseSpy.getRecipe).to.have.callCount(1);
		chai.expect(databaseSpy.deleteRecipe).to.have.callCount(1);
	  });

      it('should fail to delete a recipe due to external reason', async() => {
		let options = {
		  "body": {
			email: process.env.ADMIN_ONE,
			recipeName: "testRecipeToDelete"
		  }
		};

		const dummyRecipes = [ "dummy" ];
	    
	    verifyStub.resolves(dummyTicket);
		let res = mockResponse();
		let req = mockRequest(options);
		databaseSpy.getRecipe = sinon.stub().returns(dummyRecipes);
		databaseSpy.deleteRecipe = sinon.spy();
		await handler.handleDeleteRecipe(req, res);
		chai.expect(res.status).to.have.been.calledWith(500);
		chai.expect(databaseSpy.getRecipe).to.have.callCount(1);
		chai.expect(databaseSpy.deleteRecipe).to.have.callCount(1);
	  });
	});
  });

  describe("handleUpdateRecipe", () => {
    describe("When google verification occurs", () => {
	  it('should not allow unauthorized users', async() => {
		const options = {
		  body: {
			email: "bad@gmail.com"
		  }
		};
		
	    const req = mockRequest(options);
		const res = mockResponse();
		const copy = {
		  payload: {
		    email: "bad@gmail.com"	
		  }
		};

		verifyStub.resolves(copy);
	    await handler.handleUpdateRecipe(dummyReq, res);
		chai.expect(res.status).to.have.been.calledWith(403);
	  });

      it('should output an error when verification fails', async() => {
		const options = {
		  body: {
			email: "bad@gmail.com"
		  }
		};
		
	    const req = mockRequest(options);
		const res = mockResponse(options);
		verifyStub.rejects("Not authorized user.");
		await handler.handleUpdateRecipe(req, res);
		chai.expect(res.status).to.have.been.calledWith(400);
	  });

      it('should update the recipe', async() => {
		let options = {
		  "body": {
			email: process.env.ADMIN_ONE,
			recipeName: "testRecipeToUpdate",
			data: "{new data}"
		  }
		};

		const goodUpdate = {
		  n: 1,
		  nModified: 0,
		  ok: 1
		};

		const dummyRecipes = [];
	    
	    verifyStub.resolves(dummyTicket);
		let res = mockResponse();
		let req = mockRequest(options);
		databaseSpy.updateRecipe = sinon.stub().returns(goodUpdate);
		await handler.handleUpdateRecipe(req, res);
		chai.expect(res.status).to.have.been.calledWith(200);
		chai.expect(databaseSpy.updateRecipe).to.have.callCount(1);
	  });

      it('should not update the recipe', async() => {
		let options = {
		  "body": {
			email: process.env.ADMIN_ONE,
			recipeName: "testRecipeToUpdate",
			data: "{new data}"
		  }
		};

		const badUpdate = {
		  n: 0,
		  nModified: 0,
		  ok: 0
		};

		const dummyRecipes = [];
	    
	    verifyStub.resolves(dummyTicket);
		let res = mockResponse();
		let req = mockRequest(options);
		databaseSpy.updateRecipe = sinon.stub().returns(badUpdate);
		await handler.handleUpdateRecipe(req, res);
		chai.expect(res.status).to.have.been.calledWith(500);
		chai.expect(databaseSpy.updateRecipe).to.have.callCount(1);
	  });
	});
  });

});
