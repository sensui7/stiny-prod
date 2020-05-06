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
  handler.handleDeleteAlbum(req, res);
});

router.post('/editAlbum', function (req, res) {
  handler.handleEditAlbum(req, res);
});

router.post('/addPhoto', upload.single('image'), function (req, res, next) {
  handler.handleAddPhoto(req, res);
});

router.post('/deletePhoto', function (req, res) {
  handler.handleDeletePhoto(req, res);
});

router.post('/editPhoto', function (req, res) {
  handler.handleEditPhoto(req, res);
});

router.get('/albums', function (req, res) {
  handler.handleGetAlbumList(req, res);
});

router.get('/albumPhotos', function(req, res) {
  handler.handleGetAlbumPhotos(req, res);
});

module.exports = router;

