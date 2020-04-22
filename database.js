const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');
require('dotenv').config();

const photoSchema = new Schema({
  link: {type: String, required: true},
  caption: {type: String, required: true},
  date: {type: String, required: true},
});

const albumSchema = new Schema ({
  album: [photoSchema],
  name: {type: String, required: true, unique: true}
});

albumSchema.plugin(uniqueValidator);
const Name = mongoose.model('Album', albumSchema);

const config = {
  useNewUrlParser: true,
  useUnifiedTopology: true
};

// Initial database connection
mongoose.connect(process.env.MONGO_CONNECT, config).catch(error => {
  console.log("Error: ", error);
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));

//async function albumExists(albumName, data) {
async function albumExists(albumName) {
  return await Name.find({name: albumName}, (err, entry) => {
    if (err) {
	  throw err;
	}

	return entry;
  });
}

async function getAlbum(albumName) {
  return await Name.find({name: albumName}, (err, entry) => {
    if (err) {
	  throw err;
	}

	return entry;
  });
}

async function createAlbum(albumName) {
  const data = Name({
    album: [],
	name: albumName
  });

  await data.save(function (err) {
    if (err) {
	  return;
    }

    console.log("Album saved.");
  });

  return await getAlbum(albumName);
}

async function deleteAlbum(albumName) {
  await db.collection(albumName).drop().catch(err => {console.log(err)});
}

exports.getAlbum = getAlbum;
exports.createAlbum = createAlbum;
exports.deleteAlbum = deleteAlbum;
exports.mongoose = mongoose;
