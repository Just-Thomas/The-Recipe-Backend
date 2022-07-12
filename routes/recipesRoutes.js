 const express = require('express');
 const router = express.Router();
 const recipesController = require('../controllers/recipeController');

router.post('/recipe', recipesController.createRecipe,)
router.put('/recipe/:id', recipesController.updateRecipe,)
router.delete('/recipe/:id', recipesController.deleteRecipe,)
router.get('/recipe', recipesController.getRecipes,)
router.get('/recipe/:id', recipesController.getRecipeById,)

 
 module.exports = router;