const express = require("express");
const router = express.Router();

const bookController = require("../controllers/bookController");

const { protect, admin } = require("../middleware/authMiddleware");


router.post("/", protect, admin, bookController.createBook);
router.put("/:id", protect, admin, bookController.updateBook);
router.delete("/:id", protect, admin, bookController.deleteBook);



router.get("/", protect, bookController.getAllBooks);
router.get("/:id", protect, bookController.getBookById);


module.exports = router;