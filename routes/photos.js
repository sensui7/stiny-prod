const express = require('express');
const router = express.Router();
const handler = require('./photoHandler');
const fs = require("fs");
const multer = require('multer')

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, cb) {
      cb(null, 'uploads/');
    },
    filename(req, file, cb) {      
      cb(null, file.originalname);
    },
  }),
});

router.post('/createAlbum', function (req, res) {
  handler.handleCreateAlbum(req, res);
});

router.post('/deleteAlbum', function (req, res) {
	console.log("delete album");
});

router.post('/modifyAlbum', function (req, res) {
	console.log("modify album");
});

router.post('/addPhoto', upload.single('image'), function (req, res, next) {
  handler.handleAddPhoto(req, res);
});

router.post('/deletePhoto', function (req, res) {
	console.log("delete photo");
});

router.post('/modifyPhoto', function (req, res) {
	console.log("modify photo");
});

router.get('/album/:albumname', function (req, res) {
  res.send(req.params);
});

module.exports = router;

