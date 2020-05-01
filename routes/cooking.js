const express = require('express');
const router = express.Router();
const handler = require('./cookingHandler');

router.post('/addRecipe', (req, res) => {
  handler.handleAddRecipe(req, res);
});

router.post('/updateRecipe', (req, res) => {
  handler.handleUpdateRecipe(req, res);
});

router.post('/deleteRecipe', (req, res) => {
  handler.handleDeleteRecipe(req, res);
});

router.get('/getAllRecipes', (req, res) => {
  handler.handleGetAllRecipes(req, res);
});

module.exports = router;
