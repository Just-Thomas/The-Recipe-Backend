const Recipe = require('../models/recipeModel')

createRecipe = (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must enter a recipe',
        })
    }

    const recipe = new Recipe(body);

    if (!recipe) {
        return res.status(400).json({ success: false, error: err})
        
    }

    recipe 
    .save()
    .then(() => {
        return res.status(201).json ({
            success: true,
            id: recipe._id,
            message: 'Recipe added',
        })
    })
    .catch(error => {
        return res.status(400).json({
            error,
            message: 'Recipe not added',
        })
    })
}

updateRecipe = async (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'This can not be left blank',
        })
    }

    Recipe.findOne({ _id: req.params.id}, (err, recipe) => {
        if (err) {
            return res.status(400).json({
                err,
                message: 'Recipe not found',
            })
        }

        recipe.name = body.name
        recipe.image = body.image
        recipe.description = body.description
        recipe.ingredients = body.ingredients
        recipe.directions = body.directions
        recipe
        
        .save()
        .then(() => {
            return res.status(200).json ({
                success: true,
                id: recipe._id,
                message: 'Recipe updated',
            })
        })
        .catch(error => {
            return res.status(404).json ({
                error,
                message: 'Recipe not updated',
            })
        })
    })
}

deleteRecipe = async (req, res) => {
    await Recipe.findOneAndDelete({_id: req.params.id }, (err, recipe) => {
        if (err) {
            return res.status(400).json({ success: false, error:err})
        }

        if (!recipe) {
            return res.status(404).json({ success: false, error: 'Recipe not found'
            })
        }

        return res.status(200).json({ success: true, data: recipe})
        
    })
    .catch(err => console.log(err))
}

getRecipes = async (req, res) => {
    await Recipe.find({}, (err, recipe) => {
        if (err) {
            return res.status(400).json({ success: false, error:err})
        }

        if (!recipe.length) {
            return res.status(404).json({ success: false, error: 'Recipe not found'
            })
        }

        return res.status(200).json({ success: true, data: recipe})
        
    })
    .catch(err => console.log(err))

}

getRecipeById = async (req, res) => {
    await Recipe.findOne({_id: req.params.id }, (err, recipe) => {
        if (err) {
            return res.status(400).json({ success: false, error:err})
        }

        if (!recipe) {
            return res.status(404).json({ success: false, error: 'Recipe not found'
            })
        }

        return res.status(200).json({ success: true, data: recipe})
        
    })
    .catch(err => console.log(err))

}




module.exports ={
    createRecipe,
    updateRecipe,
    deleteRecipe,
    getRecipes,
    getRecipeById,
}