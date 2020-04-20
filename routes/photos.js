var express = require('express');
var router = express.Router();

let verifyToken = function (req) {
    const {OAuth2Client} = require('google-auth-library');
    const client = new OAuth2Client(process.env.CLIENT_ID);

    async function verify() {
        const ticket = await client.verifyIdToken({
            idToken: req.body.idtoken + "a",
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

router.post('/createAlbum', function (req, res) {
	console.log("create album");
    verifyToken().then(ticket => {
        console.log(ticket);
    }, error => {
        console.log(error);
    });

	res.end();
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

