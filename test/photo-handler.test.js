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
let uploadStub = sinon.stub();
mock('../routes/uploadPhoto', uploadStub);
let handler = require('../routes/photoHandler');

console.log("HANDLER: " + handler);

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
  describe("handleCreateAlbum", () => {
    describe("When google verification occurs", () => {
	  afterEach(() => {
	    verifyStub.reset();
	  });

	  it('should call response with 403 for an empty album name', async() => {
		let options = {
		  "body": {
			email: process.env.ADMIN_ONE,
			albumName: "",
			caption: "testCaption",
			date: "testDate"
		  }
		};

	    verifyStub.resolves(dummyTicket);
		let res = mockResponse();
		let req = mockRequest(options);
		databaseSpy.createAlbum = sinon.spy();
		await handler.handleCreateAlbum(req, res);
		chai.expect(res.status).to.have.been.calledWith(403);
		chai.expect(databaseSpy.createAlbum).to.have.callCount(0);
	  });

	  it('should add a new album name', async() => {
		let options = {
		  "body": {
			email: process.env.ADMIN_ONE,
			albumName: "testAlbum",
			caption: "testCaption",
			date: "testDate"
		  }
		};
	    
	    verifyStub.resolves(dummyTicket);
		let res = mockResponse();
		let req = mockRequest(options);
		databaseSpy.getAlbum = sinon.spy();
		databaseSpy.createAlbum = sinon.spy();
		await handler.handleCreateAlbum(req, res);
		chai.expect(res.status).to.have.been.calledWith(200);
		chai.expect(databaseSpy.createAlbum).to.have.callCount(1);
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
		await handler.handleCreateAlbum(req, res);
		chai.expect(res.status).to.have.been.calledWith(400);
	  });
	});
  });

  describe("handleAddPhoto", () => {
	describe("When google verification occurs", () => {
	  afterEach(() => {
	    verifyStub.reset();
		uploadStub.reset();
	  });

	  it('should only allow admins', async() => {
		let options = {
		  "body": {
			email: process.env.ADMIN_ONE,
			albumName: "testAlbum",
			caption: "testCaption",
			date: "testDate"
		  },
		  "file": {
			originalname: "testFile"
		  }
		};

		let req = mockRequest(options);
		let res = mockResponse(options);
	    verifyStub.resolves(dummyTicket);
		uploadStub.resolves({"secure_url": "https://test.com/"});
		databaseSpy.getAlbum = sinon.stub().returns({});
		databaseSpy.addPicture = sinon.stub();
		databaseSpy.addPicture.resolves(true);

		await handler.handleAddPhoto(req, res);
		chai.expect(res.status).to.have.been.calledWith(200);
		sinon.assert.calledOnce(verifyStub);
		sinon.assert.calledOnce(databaseSpy.addPicture);
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
	    await handler.handleAddPhoto(dummyReq, res);
		chai.expect(res.status).to.have.been.calledWith(401);
	  });

	  it('should not work with a non-existing album', async() => {
		const options = {
		  body: {
			email: process.env.ADMIN_ONE
		  }
		};
		
		databaseSpy.getAlbum = sinon.stub().returns(undefined);
		verifyStub.resolves(dummyTicket);
	    const req = mockRequest(options);
	    const res = mockResponse();
		await handler.handleAddPhoto(req, res);
		chai.expect(res.status).to.have.been.calledWith(403);
	  });

	  it('should output an error when verification fails', async() => {
		const options = {
		  body: {
			email: "bad@gmail.com"
		  }
		};
		
	    const req = mockRequest(options);
	    const res = mockResponse();
		verifyStub.rejects("Not authorized user.");
		await handler.handleAddPhoto(req, res);
		chai.expect(res.status).to.have.been.calledWith(400);
      });
	});
  });

  describe('handleGetAlbumList', () => {
    describe("When google verification occurs", () => {
	  afterEach(() => {
	    verifyStub.reset();
	  });

	  it('should get the list of albums', async() => {
		let options = {
		  body: {
		    email: process.env.ADMIN_ONE
		  },
		  params: {
			albumName: "testAlbum",
		  }
		};
	   
	    verifyStub.resolves(dummyTicket);
		let res = mockResponse(options);
		let req = mockRequest(options);
		databaseSpy.getAlbumList = sinon.spy();
		await handler.handleGetAlbumList(req, res);
		chai.expect(res.status).to.have.been.calledWith(200);
		chai.expect(databaseSpy.createAlbum).to.have.callCount(1);
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
		await handler.handleGetAlbumList(req, res);
		chai.expect(res.status).to.have.been.calledWith(400);
	  });
	});
  });

  describe('handleGetAlbumPhotos', () => {
	describe("when google verification occurs", () => {
	  afterEach(() => {
	    verifyStub.reset();
	  });

	  it('should get all photos for album', async() => {
		const options = {
		  body: {
			email: process.env.ADMIN_ONE
		  },
	      query: {
			idtoken: "testtoken"
		  }
		};

		const dummyAlbum = {
			album: {
				link: "test.com",
				caption: "testCaption",
				date: "testDate"
			}
		};
	
	    const req = mockRequest(options);
		const res = mockResponse();

		databaseSpy.getAlbum = sinon.stub().returns(dummyAlbum);
		verifyStub.resolves(dummyTicket);
	    await handler.handleGetAlbumPhotos(req, res);
		chai.expect(res.status).to.have.been.calledWith(200);
		chai.expect(databaseSpy.getAlbum).to.have.callCount(1);
	  });

	  it('should not allow unauthorized users', async() => {
		const options = {
		  body: {
			email: "bad@gmail.com"
		  },
	      query: {
			idtoken: "testtoken"
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
	    await handler.handleGetAlbumPhotos(req, res);
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
		await handler.handleGetAlbumPhotos(req, res);
		chai.expect(res.status).to.have.been.calledWith(400);
	  });
	});
  });

  describe('handleDeletePhoto', () => {
	describe("when google verification occurs", () => {
	  afterEach(() => {
	    verifyStub.reset();
	  });

	  it('should delete the photo from the album', async() => {
		const options = {
		  body: {
			email: process.env.ADMIN_ONE,
			albumName: "testAlbum",
			link: "https://test.com/"
		  },
	      query: {
			idtoken: "testtoken"
		  }
		};

		const dummyResult= {
		  ok: 1
		};
	
	    const req = mockRequest(options);
		const res = mockResponse();

		databaseSpy.deletePicture = sinon.stub().returns(dummyResult);
		verifyStub.resolves(dummyTicket);
	    await handler.handleDeletePhoto(req, res);
		chai.expect(res.status).to.have.been.calledWith(200);
		chai.expect(databaseSpy.deletePicture).to.have.callCount(1);
	  }
	  );
	  it('should not delete photo from album if operation did not succeed', async() => {
		const options = {
		  body: {
			email: process.env.ADMIN_ONE,
			albumName: "testAlbum",
			link: "https://test.com/"
		  },
	      query: {
			idtoken: "testtoken"
		  }
		};

		const dummyResult= {
		  ok: 0
		};
	
	    const req = mockRequest(options);
		const res = mockResponse();

		databaseSpy.deletePicture = sinon.stub().returns(dummyResult);
		verifyStub.resolves(dummyTicket);
	    await handler.handleDeletePhoto(req, res);
		chai.expect(res.status).to.have.been.calledWith(500);
		chai.expect(databaseSpy.deletePicture).to.have.callCount(1);
	  });

	  it('should not allow unauthorized users', async() => {
		const options = {
		  body: {
			email: "bad@gmail.com"
		  },
	      query: {
			idtoken: "testtoken"
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
	    await handler.handleDeletePhoto(req, res);
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
		await handler.handleDeletePhoto(req, res);
		chai.expect(res.status).to.have.been.calledWith(400);
	  });
	});
  });
});
