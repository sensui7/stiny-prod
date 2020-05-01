const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');
const { MongoMemoryServer } = require('mongodb-memory-server');
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

const recipeSchema = new Schema ({
  data: {type: String, required: true},
  name: {type: String, required: true, unique: true}
});

albumSchema.plugin(uniqueValidator);
const Name = mongoose.model('Album', albumSchema);
const Recipe = mongoose.model('Recipe', recipeSchema);

const config = {
  useNewUrlParser: true,
  useUnifiedTopology: true
};

const mongod = new MongoMemoryServer();

// Initial database connection
/*
mongoose.connect(process.env.MONGO_CONNECT, config).catch(error => {
  console.log("Error: ", error);
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
*/

async function connect(mongoUri) {
  const uri = mongoUri || await mongod.getConnectionString();
  await mongoose.connect(uri, config);
}

async function getAlbum(albumName) {
  return await Name.find({name: albumName}, async (err, entry) => {
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

  await data.save(async function (err, res) {
    if (err) {
	  console.log("Error occured when creating a new album: " + err);
	  return;
    }

  });
}

/*
1. Find the album if it exists
2. Once album found, add onto the array entry
3. Store the data back into the database
*/
async function addPicture(data) {
  let albumName = data.albumName;
  let entry = await getAlbum(albumName);

  return await Name.findOneAndUpdate(
		  { name: albumName }, 
		  { $addToSet: { album: data } },
		  (err, result) => {
		 	if (err) {
			  console.log("Err: " + err);
			  return;
			}
		  });
}

/*
1. Pull operator removes an item from an array
2. Get to the alubm
3. Pass in an object query representing the link to be found to delete
*/
async function deletePicture(albumName, link) {
  return await Name.updateOne(
		  { name: albumName },
		  { $pull: { album: {link: link} } },
		  (err, result) => {
		 	if (err) {
			  console.log("Err: " + err);
			  return;
			}
		  });
}

async function getAlbumList() {
  const albumList = await Name.find({});
  return albumList.map(item => item.name);
}

async function addRecipe(name, data) {
  const recipe = Recipe({
    data: data,
	name: name
  });

  await recipe.save(async (err, res) => {
    if (err) {
	  console.log("Error occured when creating a new album: " + err);
	  return;
    }
  });
}

async function getAllRecipes() {
  const recipes = await Recipe.find({});
  return recipes.map(item => {
	return {
	  name: item.name,
	  data: item.data
	};
  });
}

async function getRecipe(recipeName) {
  return await Recipe.find({name: recipeName}, async (err, entry) => {
    if (err) {
	  throw err;
	}

	return entry;
  });
}

async function deleteRecipe(recipeName) {
  return await Recipe.deleteOne({ name: recipeName }, (err) => {
    if (err) {
	  throw err;
	}
  });
}

async function closeDatabase() {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongod.stop();
}

async function deleteAlbum(albumName) {
  await mongoose.connection.collection(albumName).drop().catch(err => {console.log(err)});
}

module.exports.addPicture = addPicture;
exports.getAlbum = getAlbum;
exports.createAlbum = createAlbum;
exports.deleteAlbum = deleteAlbum;
exports.addPicture = addPicture;
exports.deletePicture = deletePicture;
exports.getAlbumList = getAlbumList;
exports.addRecipe = addRecipe;
exports.getAllRecipes = getAllRecipes;
exports.getRecipe = getRecipe;
exports.deleteRecipe = deleteRecipe;
exports.connect = connect;
exports.closeDatabase = closeDatabase;
exports.mongoose = mongoose;
