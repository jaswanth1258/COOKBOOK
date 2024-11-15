const express = require("express");
const recipeRouter = express.Router();
const {
  getAllRecipe,
  addRecipe,
  getById,
  getRecipeByName,
  deleteRecipeByName,
  getRecipeByIngredients,
  getByIdString,
  updateRecipe,
} = require("../controller/recipe-controller");

recipeRouter.get("/", getAllRecipe);
recipeRouter.post("/add", addRecipe);
recipeRouter.patch("/edit/:id", updateRecipe);
recipeRouter.get("/id", getById);
recipeRouter.get("/:id", getByIdString);
recipeRouter.post("/name", getRecipeByName);
recipeRouter.post("/ingredient", getRecipeByIngredients);
recipeRouter.post("/delete", deleteRecipeByName);



module.exports = recipeRouter;
