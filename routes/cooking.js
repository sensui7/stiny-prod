const express = require('express');
const router = express.Router();
const handler = require('./cookingHandler');
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

router.post('/addRecipe', upload.single('image'), (req, res, next) => {
  handler.handleAddRecipe(req, res);
});

router.post('/updateRecipe', upload.single('image'), (req, res, next) => {
  handler.handleUpdateRecipe(req, res);
});

router.post('/deleteRecipe', (req, res) => {
  handler.handleDeleteRecipe(req, res);
});

router.get('/getAllRecipes', (req, res) => {
  handler.handleGetAllRecipes(req, res);
});

module.exports = router;
