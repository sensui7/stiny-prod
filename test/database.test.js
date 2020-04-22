const assert = require('assert');
const should = require('should');
const sinon = require('sinon');
const chai = require('chai');
const expect = chai.expect;
const database = require('../database');
require('dotenv').config();

describe('Database Tests', () => {
	after(done => {
	  database.deleteAlbum("albums").then(res => {
	    database.mongoose.connection.close(); 
		done();
      });
	});

	it('should successfully add a new album to the database', done => {
	  database.createAlbum("Memories").then(resolve => {
		done();
	  });
	});

	it('should not add duplicate album(s) to the database', done => {
	  database.createAlbum("Memories");

	  database.getAlbum("Memories").then(resolve => {
		if (resolve.length !== 1) {
		  done(new Error("Duplicate occurred!"));
		} else {
		  done();
		}
	  });
	});
});
