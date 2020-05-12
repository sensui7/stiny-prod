const resnap = require('resnap');

const database = require('../database');
const verifyToken = require('./verifyToken');
const uploadPhoto = require('./uploadPhoto');
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

	// Need to add cloudinary logic if it's a personal photo!
	const file = req.file;

	// Means URL is referenced or no file uploaded at all
	if (file === undefined) {
	  await database.addRecipe(req.body.recipeName, req.body.data, req.body.preview);
	  res.status(200).end();
	  return;
	}

	// Handle photo upload with cloudinary
	const filename = file.originalname;
	const outcome = uploadPhoto(file.originalname);

	let result = outcome.then(resolve => {
	  console.log("Cloudinary succeeded.");
	  return resolve.secure_url;
	}, err => {
	  console.log("Cloudinary failed: " + err);
	});

	// Should have the secure_url as the resolved value from the previous promise
	await result.then(async resolve => {
	  const secure_url = resolve;
	  
	  await database.addRecipe(req.body.recipeName, req.body.data, secure_url);
	  res.status(200).end();
	}, err => {
      res.status(500).end();	
	});

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

async function handleUpdateRecipe(req, res) {
  return verifyToken(req).then(async ticket => {
    const email = ticket.payload['email'];

    if (!admins.includes(email)) {
	  res.status(403).end();
	  return;
	}

	let newName = req.body.newName;
	const recipeName = req.body.recipeName;
	const preview = req.body.preview;
	const newData = req.body.data;
	const file = req.file;

	// If new name not specified, assume old name to update
	if (newName === undefined) {
	  newName = recipeName;
	}


	if (file === undefined) {
	  const result = (preview === undefined || preview === null) ? await database.updateRecipe(recipeName, newData, undefined, newName)
			  												     : await database.updateRecipe(recipeName, newData, preview, newName);

	  // Update did not occur
	  if (result === undefined || result.ok === 0) {
	    res.status(500).end();
	    return;
	  }

	  // Update was successful
	  res.status(200).end();
	  return;
	}

	// Handle photo upload with cloudinary
	const filename = file.originalname;
	const outcome = uploadPhoto(file.originalname);

	let result = outcome.then(resolve => {
	  console.log("Cloudinary succeeded.");
	  return resolve.secure_url;
	}, err => {
	  console.log("Cloudinary failed: " + err);
	});

	// Should have the secure_url as the resolved value from the previous promise
	await result.then(async resolve => {
	  const secure_url = resolve;
	  
	  const result = await database.updateRecipe(recipeName, newData, secure_url, newName);
	  // Update did not occur
	  if (result === undefined || result.ok === 0) {
	    res.status(500).end();
	    return;
	  }

	  // Update was successful
	  res.status(200).end();
	}, err => {
      res.status(500).end();	
	});

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
exports.handleUpdateRecipe = handleUpdateRecipe;
exports.handleGetAllRecipes = handleGetAllRecipes;
