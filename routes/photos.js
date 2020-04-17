var express = require('express');
var router = express.Router();

router.post('/createAlbum', function (req, res) {
	console.log("create album");
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

