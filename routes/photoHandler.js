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

async function handleCreateAlbum(req, res) {
  if (req.body.albumName === "") {
	res.status(403).end();
    return;
  }

  return verifyToken(req).then(async ticket => {
    const email = ticket.payload['email'];

    if (!admins.includes(email)) {
	  res.status(403).end();
	  return;
	}

	let find = await database.getAlbum(req.body.albumName);
	if (find !== undefined && find.length === 1) {
	  res.status(403).end();
	  return;
	}

	await database.createAlbum(req.body.albumName);

	res.status(200).end();
  }, error => {
    console.log("Could not verify or token expired: " + error);
	res.status(400).end();
  });
}

async function handleAddPhoto(req, res) {
  return verifyToken(req).then(async ticket => {
    const email = ticket.payload['email'];

    if (!admins.includes(email)) {
	  res.status(401).end();
	  return;
	}

	let find = await database.getAlbum(req.body.albumName);
	if (find === undefined) {
	  res.status(403).end();
	  return;
	}

	const data = req.body;

	let dataToSend = {
	  albumName: data.albumName,
	  caption: data.caption,
	  date: data.date
	};

	const file = req.file;
	const filename = file.originalname;
	const outcome = uploadPhoto(file.originalname);

	let result = outcome.then(resolve => {
	  console.log("Cloudinary succeeded.");
	  return resolve.secure_url;
	}, err => {
	  console.log("Cloudinary failed: " + err);
	});

	// Should have the secure_url as the resolved value from the previous promise
	await result.then(resolve => {
	  const secure_url = resolve;
	  dataToSend.link = secure_url;

	  database.addPicture(dataToSend).then(resolve => {
	    res.status(200).end();
	  }, err => {
	    console.log("Adding photo to database failed: " + err);
	  });
	}, err => {
	  res.status(500).end();
	});

  }, error => {
    console.log("Could not verify or token expired: " + error);
	res.status(400).end();
  });
}

async function handleGetAlbumList(req, res) {
  req.body = {
	idtoken: req.query.idtoken
  };

  return verifyToken(req).then(async ticket => {
    const email = ticket.payload['email'];

    if (!admins.includes(email)) {
	  res.status(403).end();
	  return;
	}

	let data = await database.getAlbumList();

	res.status(200).send(data);
	console.log("sending: " + data);
  }, error => {
    console.log("Could not verify or token expired: " + error);
	res.status(400).end();
  });
}

async function handleGetAlbumPhotos(req, res) {
  req.body = {
	idtoken: req.query.idtoken
  };

  return verifyToken(req).then(async ticket => {
    const email = ticket.payload['email'];

    if (!admins.includes(email)) {
	  res.status(403).end();
	  return;
	}

	let data = await database.getAlbum(req.query.albumName);

	res.status(200).send(data);
  }, error => {
    console.log("Could not verify or token expired: " + error);
	res.status(400).end();
  });
}

exports.handleCreateAlbum = handleCreateAlbum;
exports.handleAddPhoto = handleAddPhoto;
exports.handleGetAlbumList = handleGetAlbumList;
exports.handleGetAlbumPhotos = handleGetAlbumPhotos;
