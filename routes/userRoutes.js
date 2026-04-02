const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  getAllUsers,
} = require("../controllers/userController");
const { admin, protect } = require("../middleware/authMiddleware");


router.get("/all", protect, admin, getAllUsers);
router.post("/register", registerUser);
router.post("/login", loginUser);


module.exports = router;