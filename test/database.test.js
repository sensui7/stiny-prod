const assert = require('assert');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const chai = require('chai');
const expect = chai.expect;
require('dotenv').config();

const ALBUM_TESTS = "albumtests";

const photoSchema = new Schema({
  link: {type: String, required: true},
  caption: {type: String, required: true},
  date: {type: String, required: true},		
});

const albumSchema = new Schema ({
  album: [photoSchema],
  name: {type: String, required: true}
});

const Name = mongoose.model('Albumtest', albumSchema);

const config = {
  useNewUrlParser: true
};

describe('Database Tests', () => {
  before(done => {
    mongoose.connect('mongodb://127.0.0.1:27017', config);
    var db = mongoose.connection;
	db.on('error', console.error.bind(console, 'connection error'));
	db.once('open', () => {
		console.log("Connected");
		done();
	});
  });

  after(done => {
	//console.log(mongoose.connection.db);
    //mongoose.connection.db.collection(ALBUM_TESTS).drop();
	mongoose.connection.close(done);
  });
  
  describe('Test Database', () => {
    it('should save new name to test database', done => {
	  const photos = [
		  { 
		 	link: "abc.com/1",
			caption: "Going to the park",
			date: "11/11/2011"
		  },
		  { 
		 	link: "abc.com/2",
			caption: "Movie theatre.",
			date: "12/12/2012"
		  }
		];

		const testName = Name({
		  album: photos,
		  name: "Adventures"
		});

		console.log("hi2");
		// Done callback necessary to let mocha know the asynchronous save
		// operation is completed.
		testName.save(function(err) {
			if (err) {
			console.log("blah");
				throw err;
			}

			console.log("hi");
		});

		done();
    });

	/*
	it('Should not save incorrect format to database', done => {
      //Attempt to save with wrong field 'notName'. An error should trigger
      var wrongSave = Name({
        badAlbum: [],
		badName: ""
      });

      wrongSave.save(err => {
        if(err) { 
		  return done(); 
		}

        throw new Error('Should generate error!');
      });
    });
	
    it('Should retrieve data from test database', done => {
      //Look up the adventures album previously saved to the collections "albumtests"
      var result = Name.find({name: 'Adventures'}, (err, name) => {
        if(err) {throw err;}
        if(name.length === 0) {throw new Error('No data!');}
        done();
      });
    });
	*/
  });
});
