const database = require('../database');
const verifyToken = require('./verifyToken');
require('dotenv').config();

const admins = [
  process.env.ADMIN_ONE,
  process.env.ADMIN_TWO,
  process.env.ADMIN_THREE,
  process.env.ADMIN_FOUR
];

async function handleCreateAlbum(req, res) {
  return verifyToken(req).then(ticket => {
    const email = ticket.payload['email'];

    if (!admins.includes(email)) {
	  res.status(403).end();
	  return;
	}

	let result = database.createAlbum(req.body.albumName).then(resolve => {
	  if (resolve.length === 1) {
	    return false;
	  }
	}, err => {
	  console.log(err);
	});

	result.then(resolve => {
      if (resolve === false) {
	    res.status(403).end();
	  } else {
		res.status(200).end();
	  }
	}, err => {
	  console.log(err);	
	});
  }, error => {
    console.log(error);
	res.status(400).end();
  });
}

async function handleAddPhoto(req, res) {
  return verifyToken(req).then(ticket => {
    const email = ticket.payload['email'];

    if (!admins.includes(email)) {
	  res.status(403).end();
	  return;
	}

  }, error => {
    console.log(error);
	res.status(400).end();
  });
}

exports.handleCreateAlbum = handleCreateAlbum;
exports.handleAddPhoto = handleAddPhoto;
