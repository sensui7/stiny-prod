var express = require('express');
var router = express.Router();
const database = require('../database');
require('dotenv').config();

let verifyToken = function (req) {
    const {OAuth2Client} = require('google-auth-library');
    const client = new OAuth2Client(process.env.CLIENT_ID);

    async function verify() {
        const ticket = await client.verifyIdToken({
            idToken: req.body.idtoken,
            // CLIENT_ID that accesses backend
            audience: process.env.CLIENT_ID,
        });

      const payload = ticket.getPayload();
      const userid = payload['sub'];

      return ticket;
    }

	/*
    verify().then(ticket => {
        console.log(ticket);
    }, error => {
        console.log(error);
    });
	*/

	// Return promise instead of handling promise as above
	return verify();
};

const admins = [
  process.env.ADMIN_ONE,
  process.env.ADMIN_TWO,
  process.env.ADMIN_THREE,
  process.env.ADMIN_FOUR
];

let handleCreateAlbum = function(req, res) {
    verifyToken(req).then(ticket => {
		//console.log("ticket: " + ticket.payload['email']);
		const email = ticket.payload['email'];

		if (!admins.includes(email)) {
			res.status(403).end();
			return;
		}

		database.createAlbum(req.body.albumName);

		res.status(200).end();
    }, error => {
        console.log(error);
		res.status(400).end();
    });
}

router.post('/createAlbum', function (req, res) {
	handleCreateAlbum(req, res);
	//res.status(200).end();
});

router.post('/deleteAlbum', function (req, res) {
	console.log("delete album");
});

router.post('/modifyAlbum', function (req, res) {
	console.log("modify album");
});

router.post('/addPhoto', function (req, res) {
	console.log("add photo");
});

router.post('/deletePhoto', function (req, res) {
	console.log("delete photo");
});

router.post('/modifyPhoto', function (req, res) {
	console.log("modify photo");
});

module.exports = router;

