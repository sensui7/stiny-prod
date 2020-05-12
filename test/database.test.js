const resnap = require('resnap')
const assert = require('assert');
const should = require('should');
const sinon = require('sinon');
const chai = require('chai');
const mock = require('mock-require');
const expect = chai.expect;
const database = require('../database');

before(async() => {
  await database.connect();
});

after(async() => {
  await database.closeDatabase();
});

describe('Database Tests', () => {
	it('should successfully add a new album to the database', async() => {
	  await database.createAlbum("Memories");
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

	it('should modify captions and date for a photo', async() => {
	  const result = database.editPicture("Memories", "https://tester.com/", "11/11/2011", "No tests");
	  const test = await database.getAlbum("Memories");
	  const verify = test[0].album[1];
	  assert.equal(verify.caption, "No tests");
	  assert.equal(verify.date, "11/11/2011");
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

	it('should delete a photo from an album', async() => {
	  const result = await database.deletePicture("Memories", "https://google.com/");
	  assert.equal(result.ok, true);
	  const blah = await database.getAlbum("Memories");
	});

	it('should remove an album', async() => {
	  const result = await database.removeAlbum("Farming");
	  const total = await database.getAlbumList();
	  assert.equal(total.length, 1);
	});

	it('should rename Memories album to Adventures', async() => {
	  const result = await database.editAlbum("Memories", "Adventures");
	  const total = await database.getAlbumList();
	  assert(total[0], "Adventures");
	});

	it('should add a new recipe', async() => {
	  await database.addRecipe("Soup", "{}");
	  const result = await database.getAllRecipes();
	  assert.equal(result.length, 1);
	});

	it('should add multiple recipes', async() => {
	  await database.addRecipe("Steak", "{}");
	  const result = await database.getAllRecipes();
	  assert.equal(result.length, 2);
	});

	it('should delete a recipe', async() => {
	  await database.deleteRecipe("Soup");
	  const allRecipes = await database.getAllRecipes();
	  assert.equal(allRecipes.length, 1); 
	});

	// Returns { n: 1, nModified: 0, ok: 1 } for example 
	it('should update a recipe', async() => {
	  const testResult = await database.updateRecipe("Steak", "{no sauce}", "https://test.com/", "Steak");
	  const allRecipes = await database.getAllRecipes(); 
	  assert.equal(allRecipes[0].data, "{no sauce}");
	  assert.equal(testResult.ok, 1);
	}
	);
	it('should update a recipe with new preview image url and name', async() => {
	  const testResult = await database.updateRecipe("Steak", "{no sauce}", "https://photo.com/12345", "Steak Upgraded");
	  const allRecipes = await database.getAllRecipes(); 
	  assert.equal(allRecipes[0].name, "Steak Upgraded");
	  assert.equal(allRecipes[0].preview, "https://photo.com/12345");
	  assert.equal(testResult.ok, 1);
	});

	it('should add a recipe with a preview photo', async() => {
	  await database.addRecipe("Carmelized Apples", "{}", "https://photo.com/12345");
	  const find = await database.getRecipe("Carmelized Apples");
	  assert.equal(find[0].preview, "https://photo.com/12345");
	});
});
