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
  useNewUrlParser: true,
};

// Initial database connection
mongoose.connect(process.env.MONGO_CONNECT, config);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));

async function albumExists(albumName, data) {
  await Name.find({name: albumName}, (err, entry) => {
    if (err) {
	  throw err;
	}

	// For testing purposes
	// console.log(entry);

    if (entry.length === 0) {
      data.save(function (err) {
	    if (err) {
	      return;
        }
        console.log("Album saved.");
	  });
	} else {
		console.log("Album already exists!");
	}
  });
}

async function getAlbum(albumName) {
  const result = await Name.find({name: albumName}, (err, entry) => {
    if (err) {
	  throw err;
	}

	return entry;
  });

  return result;
}

async function createAlbum(albumName) {
	const data = Name({
      album: [],
	  name: albumName
	});

	console.log("Hitting album exists");
    await albumExists(albumName, data);
}

async function deleteAlbum(albumName) {
  await db.collection(albumName).drop().catch(err => {console.log(err)});
}

exports.getAlbum = getAlbum;
exports.createAlbum = createAlbum;
exports.deleteAlbum = deleteAlbum;
exports.mongoose = mongoose;
