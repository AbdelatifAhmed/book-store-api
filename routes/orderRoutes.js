const express = require("express");
const router = express.Router();

const { createOrder, returnBook, getMyOrders, getAllOrders } = require("../controllers/orderController");

const { protect, admin } = require("../middleware/authMiddleware");




router.post("/", protect, createOrder);


router.get("/myorders", protect, getMyOrders);


router.put("/:id/return", protect, returnBook);


router.get("/", protect, admin, getAllOrders);

module.exports = router;