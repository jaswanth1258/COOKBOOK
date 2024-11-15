const User = require("../models/User");
const bcrypt = require("bcryptjs");

const signUp = async (req, res, next) => {
  const { userName, name, url, email, password } = req.body;
  let existingUser;

  try {
    existingUser = await User.findOne({ email });
  } catch (e) {
    console.log(err);
  }

  if (existingUser) {
    return res.status(400).json({ message: "User is already exists!" });
  }
  const hashedPassword = bcrypt.hashSync(password);
  const user = new User({
    userName,
    name,
    url,
    email,
    password: hashedPassword,
    recipes: [],
  });

  try {
    user.save();
    return res.status(201).json({ user });
  } catch (e) {
    console.log(e);
  }
};
const getUserAndRecipes = async (req, res) => {
  const { _id } = req.body;
  let user;
  try {
    user = await User.findById(_id).populate("recipes");
    if (!user) {
      return res.status(400).json({ message: "no user found" });
    } else {
      return res.status(200).json({ user });
    }
  } catch (e) {
    console.log(e);
    return res.status(500).json({ error: "Internal server error" });
  }
};
const getUser = async (req, res, next) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user) {
      return res.status(200).json({ user });
    } else {
      return res.status(404).json({ error: "User not found" });
    }
  } catch (e) {
    console.log(e);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const getUserById = async (req, res, next) => {
  const { _id } = req.body;

  try {
    const user = await User.findById(req.body);

    if (user) {
      return res.status(200).json({ user });
    } else {
      return res.status(404).json({ error: "User not found" });
    }
  } catch (e) {
    console.log(e);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const getAllUsers = async (req, res, next) => {
  try {
    const user = await User.find({});

    if (user) {
      return res.status(200).json({ user });
    } else {
      return res.status(404).json({ error: "User not found" });
    }
  } catch (e) {
    console.log(e);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const logIn = async (req, res, next) => {
  const { email, password } = req.body;

  let existingUser;

  try {
    existingUser = await User.findOne({ email });
  } catch (e) {
    console.log(err);
  }
  if (!existingUser) {
    return res.status(404).json({ message: "User is not found" });
  }

  const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password);

  if (!isPasswordCorrect) {
    return res.status(400).json({ message: "Incorrect Password!" });
  }

  return res.status(200).json({ user: existingUser });
};

module.exports = {
  signUp,
  getUser,
  getAllUsers,
  logIn,
  getUserAndRecipes,
  getUserById,
};
