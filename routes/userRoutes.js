const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
} = require("../controllers/userController");

// rania put the middleware here like that 
// const { protect } = require("../middleware/authMiddleware");

// Public routes
router.post("/register", registerUser);
router.post("/login", loginUser);

// Private route handled by rania 
// router.get("/profile", getUserProfile);

module.exports = router;