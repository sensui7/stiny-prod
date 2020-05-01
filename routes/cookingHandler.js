const resnap = require('resnap');

const database = require('../database');
const verifyToken = require('./verifyToken');
require('dotenv').config();

const admins = [
  process.env.ADMIN_ONE,
  process.env.ADMIN_TWO,
  process.env.ADMIN_THREE,
  process.env.ADMIN_FOUR
];

database.connect(process.env.MONGO_CONNECT);

async function handleAddRecipe(req, res) {
  return verifyToken(req).then(async ticket => {
    const email = ticket.payload['email'];

    if (!admins.includes(email)) {
	  res.status(403).end();
	  return;
	}

	let find = await database.getRecipe(req.body.recipeName);
	if (find !== undefined && find.length === 1) {
	  res.status(500).end();
	  return;
	}

	await database.addRecipe(req.body.recipeName, req.body.data);

	res.status(200).end();
  }, error => {
    console.log("Could not verify or token expired: " + error);
	res.status(400).end();
  });
}

async function handleDeleteRecipe(req, res) {
  return verifyToken(req).then(async ticket => {
    const email = ticket.payload['email'];

    if (!admins.includes(email)) {
	  res.status(403).end();
	  return;
	}

	const recipeName = req.body.recipeName;

	await database.deleteRecipe(recipeName);

	let find = await database.getRecipe(recipeName);

	// If the entry isn't found, this means the operation was successful
	if (find === undefined || find.length === 0) {
	  res.status(200).end();
	  return;
	}

	// Otherwise for some malformed reason, return unsuccessful operation
	res.status(500).end();
  }, error => {
    console.log("Could not verify or token expired: " + error);
	res.status(400).end();
  });
}

async function handleGetAllRecipes(req, res) {
  let data = await database.getAllRecipes();
  res.status(200).send(data);
}

exports.handleAddRecipe = handleAddRecipe;
exports.handleDeleteRecipe = handleDeleteRecipe;
exports.handleGetAllRecipes = handleGetAllRecipes;
