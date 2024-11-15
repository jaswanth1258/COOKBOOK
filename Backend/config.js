const mongoose = require("mongoose");
require("dotenv").config();
mongoose.set("strictQuery", false);

mongoose
  .connect("mongodb://127.0.0.1:27017/DBMS_db", {
    // .connect(process.env.MONGO_DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connected!");
  })
  .catch((err) => {
    console.log(err);
  });
