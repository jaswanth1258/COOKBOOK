const express = require("express");

const fileUpload = require("express-fileupload");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");
const userRouter = require("./routes/user-routes");
const recipeRouter = require("./routes/recipe-routes");
app.use(fileUpload());
app.use(cors());
require("./config");
app.set("view engine", "ejs");
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/users", userRouter);
app.use("/api/recipes", recipeRouter);

app.listen(4000);
app.get("", (req, res) => {
  res.send("Hello world");
});
