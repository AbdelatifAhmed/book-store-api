const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  getAllUsers,
  getUser,
  updateUserProfile
} = require("../controllers/userController");
const { admin, protect } = require("../middleware/authMiddleware");


router.get("/all", protect, admin, getAllUsers);
router.get("/:id", protect, getUser);
router.post("/register", registerUser);
router.post("/login", loginUser);
router.put("/profile", protect, updateUserProfile);


module.exports = router;