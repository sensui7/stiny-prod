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

// Necessary?
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
  handler.handleDeletePhoto(req, res);
});

router.post('/modifyPhoto', function (req, res) {
  console.log("modify photo");
});

router.get('/albums', function (req, res) {
  handler.handleGetAlbumList(req, res);
});

router.get('/albumPhotos', function(req, res) {
  handler.handleGetAlbumPhotos(req, res);
});

module.exports = router;

