const mongoose = require("mongoose");

const Recipe = require("../models/Recipe");
const User = require("../models/User");

const getAllRecipe = async (req, res, next) => {
  let recipes;
  try {
    recipes = await Recipe.find();
  } catch (e) {
    console.log(e);
  }

  if (!recipes) {
    return res.status(404).json({ message: " No blogs found" });
  }

  return res.status(200).json({ recipes });
};

const addRecipe = async (req, res, next) => {
  const { Name, url, type, ingredients, procedure, user, date } = req.body;
  const currentDate = new Date();

  // const user = "653d015bf9a335aee5184110";
  let existingUser;

  try {
    existingUser = await User.findById(user);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: "Internal server error" });
  }

  if (!existingUser) {
    return res.status(400).json({ message: "User not found" });
  }

  const recipe = new Recipe({
    Name,
    url,
    type,
    ingredients,
    procedure,
    user,
    date: currentDate,
  });

  try {
    await recipe.save();

    existingUser.recipes.push(recipe);
    await existingUser.save();

    return res.status(200).json({ recipe });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "cannot add the recipe" });
  }
};

const getById = async (req, res, next) => {
  let { _id } = req.body;
  console.log(req.params.id);
  // let { _id } = req.params.id;
  let recipe;
  try {
    recipe = await Recipe.findById(_id);

    if (!recipe) {
      return res.status(201).json({ message: "no recipe is found" });
    }
    return res.status(200).json(recipe);
  } catch (e) {
    res.status(400).json({ message: "server error" });
  }
};

const getByIdString = async (req, res, next) => {
  let { id } = req.params.id;
  let recipe;
  try {
    recipe = await Recipe.findById(req.params.id);

    if (!recipe) {
      return res
        .status(201)
        .json({ message: "no recipe is found", id: "string" });
    }
    return res.status(200).json(recipe);
  } catch (e) {
    res.status(400).json({ message: "server error" });
  }
};

const getRecipeByName = async (req, res, next) => {
  let { Name } = req.body;
  let recipe;
  try {
    recipe = await Recipe.find({
      // Name: Name
      Name: { $regex: Name, $options: "i" },
    });

    if (!recipe) {
      return res.status(201).json({ message: "no recipe is found" });
    }
    return res.status(200).json(recipe);
  } catch (e) {
    res.status(400).json({ message: "server error" });
  }
};

const deleteRecipeByName = async (req, res, next) => {
  let { Name } = req.body;
  // console.log("delete request");
  // console.log(req.body);
  // return res.json(req.body);
  try {
    const result = await Recipe.deleteOne({ Name: Name });

    console.log(result.deletedCount);
    if (!result.deletedCount) {
      return res
        .status(404)
        .json({ success: false, message: "Recipe not found" });
    }

    return res
      .status(200)
      .json({ success: true, message: "Recipe deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while deleting the recipe",
    });
  }
};

const getRecipeByIngredients = async (req, res, next) => {
  // const { arr: ingredient } = req.body;
  const regexIngredients = req.body.ingredient.map(
    (ingredient) => new RegExp(ingredient, "i")
  );

  try {
    const recipes = await Recipe.find({
      // ingredients: { $in: req.body.ingredient },
      ingredients: { $in: regexIngredients },
    });

    if (recipes.length > 0) {
      return res.status(200).json(recipes);
    } else {
      return res
        .status(400)
        .json({ message: "No recipes found with these ingredients" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error: " + error.message });
  }
};

const updateRecipe = async (req, res, next) => {
  const { Name, url, type, ingredients, procedure } = req.body;

  let { id } = req.params.id;
  let recipe;
  try {
    recipe = await Recipe.updateOne(
      { _id: req.params.id },
      {
        $set: {
          Name,
          url,
          type,
          ingredients,
          procedure,
        },
      }
    );

    if (recipe.modifiedCount === 1) {
      res.status(200).json({ msg: "Recipe updated successfully" });
    } else {
      res.status(404).json(recipe);
    }

    // if (!recipe) {
    //   return res
    //     .status(201)
    //     .json({ message: "no recipe is found", id: "string" });
    // }
    // return res.status(200).json(recipe);
  } catch (e) {
    res.status(400).json({ message: "server error" });
  }
};

module.exports = {
  getAllRecipe,
  addRecipe,
  getById,
  getRecipeByName,
  deleteRecipeByName,
  getRecipeByIngredients,
  getByIdString,
  updateRecipe,
};
