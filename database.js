const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require('dotenv').config();

const photoSchema = new Schema({
  link: {type: String, required: true},
  caption: {type: String, required: true},
  date: {type: String, required: true},
});

const albumSchema = new Schema ({
  album: [photoSchema],
  name: {type: String, required: true}
});

const Name = mongoose.model('Album', albumSchema);

const config = {
	useNewUrlParser: true
};

function createAlbum(albumName) {
  mongoose.connect(process.env.MONGO_CONNECT, config);
  const db = mongoose.connection;

  db.on('error', console.error.bind(console, 'connection error'));
  db.once('open', () => {
    console.log("Connected to the database for createAlbum");

	const data = Name({
      album: [],
	  name: albumName
	});

	data.save(function (err) {
	  if (err) {
	    throw err;
	  }
	  mongoose.connection.close();
    });
  });
}

exports.createAlbum = createAlbum;

