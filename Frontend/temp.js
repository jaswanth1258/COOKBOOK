const API_KEY = "827957ef363b46d7843e11f92938836e";

async function getRecipesByName(recipeName) {
  const url = `https://api.spoonacular.com/recipes/search?apiKey=${API_KEY}&query=${recipeName}&number=10`;
  //   const response = await fetch(url);
  //   const data = await response.json();
  //   console.log(data);
  //   return data;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      // getRecipeInformation(data["id"]);
    });
}

async function getRecipeInformation(recipeId) {
  const url = `https://api.spoonacular.com/recipes/${634191}/information?apiKey=${API_KEY}`;
  //   const response = await fetch(url);
  //   const data = await response.json();
  //   return data;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);

    });
}

console.log(getRecipeInformation("curd"));
// console.log(getRecipesByName("icecream"));

// rl.question('Enter the recipe name: ', async (recipeName) => {
//     const recipeData = await getRecipesByName(recipeName);
//     if (recipeData['results']) {
//         console.log(`Recipes found with the name '${recipeName}':`);
//         console.log();
//         console.log();
//         for (let result of recipeData['results']) {
//             console.log("Title:", result['title']);
//             console.log();
//             const recipeInfo = await getRecipeInformation(result['id']);
//             if (recipeInfo) {
//                 console.log("Image: ",recipeInfo['image']);
//                 console.log("Cuisines:", recipeInfo['cuisines'] ? recipeInfo['cuisines'].join(", ") : "Not specified");
//                 console.log("Ready in Minutes:", recipeInfo['readyInMinutes']);
//                 console.log("Servings:", recipeInfo['servings']);
//                 console.log("Dish Types:", recipeInfo['dishTypes'] ? recipeInfo['dishTypes'].join(", ") : "Not specified");
//                 console.log();
//                 console.log("Ingredients:");
//                 console.log();
//                 for (let ingredient of recipeInfo['extendedIngredients']) {
//                     console.log(ingredient['name']);
//                 }
//                 console.log();
//                 if ('analyzedInstructions' in recipeInfo && recipeInfo['analyzedInstructions'] && recipeInfo['analyzedInstructions'].length > 0) {
//                     console.log("Recipe Steps:");
//                     for (let step of recipeInfo['analyzedInstructions'][0]['steps']) {
//                         console.log(step['step']);
//                     }
//                 } else if ('instructions' in recipeInfo && recipeInfo['instructions']) {
//                     console.log("Recipe Instructions:");
//                     console.log(recipeInfo['instructions']);
//                 } else {
//                     console.log("Recipe steps not found.");
//                 }
//                 console.log();
//                 console.log();
//             }
//         }
//     } else {
//         console.log(`No recipes found with the name: ${recipeName}`);
//     }
//     rl.close();
// });

// // const axios = require('axios');
// import axios from "axios";
// import readline from "readline";
// import process from "process";

// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout,
// });

// rl.question("Enter a recipe query: ", function (query) {
//   const apiKey = "c70rb3uXDARiI9/uabi+xA==RBG04OIzqsOg0lGV";
//   const url = `https://api.api-ninjas.com/v1/recipe?query=${query}`;

//   axios
//     .get(url, {
//       headers: {
//         "X-Api-Key": apiKey,
//       },
//     })
//     .then(function (response) {
//       console.log(response.data);
//       rl.close();
//     })
//     .catch(function (error) {
//       console.error("Error:", error.response.data);
//       rl.close();
//     });
// });

// rl.on("close", function () {
//   process.exit(0);
// });
