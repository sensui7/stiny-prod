var should = require('should');
var assert = require('assert');
var express = require('express');
var request = require('supertest');
const app = require('../app');

describe('PhotoRoutes', () => {
  describe('/createAlbum', () => {
    it('should return 302 and hits the correct path', () => {
	  request(app)
		.post('/createAlbum')
		.send({
				})
		.expect(302)
		.end(function(err, res) {
		  should(res.header.location).endWith('/createAlbum');
		  if (err) {
		    throw err;
		  }
	    });
    });
  });
});
