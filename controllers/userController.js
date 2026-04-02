const asyncHandler = require("express-async-handler");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.status(400).json({
      status: 400,
      message: "User already exists" });

  }



  if (!name || !email || !password) {
    return res.status(400).json({
      status: 400,
      message: "All fields are required"
    });
  }


  
  const user = await User.create({
    name,
    email,
    password,
  });

  if (user ) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
    });
  } else {
    res.status(400).json({
      status: 400,
      message: "Invalid user data"
    });
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select("+password");

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
    });
  } else {
    res.status(401).json({
      status: 401,
      message: "Invalid email or password"
    });
  }
});

const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find({}).sort({ createdAt: -1 });

  if (users) {
    res.status(200).json(users);
  } else {
    res.status(404).json({
      status: 404,
      message: "No users found"
    });
  }
});


const getUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt,
    });
  } else {
    res.status(404).json({
      status: 404,
      message: "User not found"
    });
  }
});

const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    const { name, email, password } = req.body;

    if (email && email !== user.email) {
      const emailExists = await User.find({ email });
      if (emailExists) {
        return res.status(400).json({
          status: 400,
          message: "Email is already taken by another user",
        });
      }
      user.email = email;
    }

    if (name) {
      if (name.length < 3) {
        return res.status(400).json({
          status: 400,
          message: "Name must be at least 3 characters long",
        });
      }
      user.name = name;
    }

    if (password) {
      if (password.length < 6) {
        return res.status(400).json({
          status: 400,
          message: "Password must be at least 6 characters long",
        });
      }
      user.password = password;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      role: updatedUser.role,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(404).json({
      status: 404,
      message: "User not found",
    });
  }
});
module.exports = {
  registerUser,
  loginUser,
  getAllUsers,
  getUser,
  updateUserProfile
};