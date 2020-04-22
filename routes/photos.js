const express = require('express');
const router = express.Router();
const handler = require('./photoHandler');

router.post('/createAlbum', function (req, res) {
  handler.handleCreateAlbum(req, res);
});

router.post('/deleteAlbum', function (req, res) {
	console.log("delete album");
});

router.post('/modifyAlbum', function (req, res) {
	console.log("modify album");
});

router.post('/addPhoto', function (req, res) {
  handler.handleAddPhoto(req, res);
});

router.post('/deletePhoto', function (req, res) {
	console.log("delete photo");
});

router.post('/modifyPhoto', function (req, res) {
	console.log("modify photo");
});

module.exports = router;
