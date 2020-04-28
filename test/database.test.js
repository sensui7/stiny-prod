const assert = require('assert');
const should = require('should');
const sinon = require('sinon');
const chai = require('chai');
const expect = chai.expect;
const database = require('../database');

before(async() => {
  await database.connect();
});

after(async() => {
  await database.deleteAlbum("albums");
  await database.closeDatabase();
});

describe('Database Tests', () => {
	it('should successfully add a new album to the database', async() => {
	  chai.expect(async () => await database.createAlbum("Memories"))
	      .to
		  .not
		  .throw();
	});

	it('should not add duplicate album(s) to the database', async() => {
	  await database.createAlbum("Memories");

	  const result = await database.getAlbum("Memories");
	  assert.equal(result.length, 1);
	});

	it('should add a photo onto an existing album in the database', async() => {
	  const dummyData = {
	    link: "https://google.com/",
		albumName: "Memories",
		caption: "Snowing",
		date: "1/1/2008"
	  };

 	  let result = await database.addPicture(dummyData);
	  assert.notEqual(result.album, undefined);
	});

	it('should add multiple photos onto an existing album in the database', async() => {
	  const dummyData = {
		link: "https://tester.com/",
		albumName: "Memories",
		caption: "Testing again",
		date: "12/12/2012"
	  };

	  let result = await database.addPicture(dummyData);
	  assert.notEqual(result.album, undefined);
	});

	it('should add another album to the album list', async() => {
	  await database.createAlbum("Farming");
	  const farming = await database.getAlbum("Farming");
	  assert.notEqual(farming, undefined);
	});

	it('should get the album list', async() => {
	  const result = await database.getAlbumList();
	  assert.equal(result.length, 2);
	});

	/*
	it('should not add a photo to a non-existent album in the database', async() => {
		
	});
	*/
});
