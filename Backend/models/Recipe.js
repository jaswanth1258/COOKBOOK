const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const recipeSchema = new Schema(
  {
    Name: {
      type: String,
      required: true,
      unique: true,
    },
    url: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    ingredients: [
      {
        type: String,
        required: true,
      },
    ],
    procedure: [
      {
        type: String,
        required: true,
      },
    ],
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    // Use the timestamps option to add createdAt and updatedAt fields
    timestamps: true,
  }
);

module.exports = mongoose.model("Recipe", recipeSchema);
