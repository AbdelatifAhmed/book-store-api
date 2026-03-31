const express = require("express");
const router = express.Router();

const { createOrder, returnBook, getMyOrders } = require("../controllers/orderController");

const { protect } = require("../middleware/authMiddleware");


router.post("/", protect, createOrder);


router.get("/myorders", protect, getMyOrders);


router.put("/:id/return", protect, returnBook);

module.exports = router;