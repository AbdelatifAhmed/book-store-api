const express = require("express");
const router = express.Router();

const { createOrder, returnBook, getMyOrders, getAllOrders , updateOrderStatus } = require("../controllers/orderController");

const { protect, admin } = require("../middleware/authMiddleware");




router.get("/all", protect, admin, getAllOrders);
router.get("/myorders", protect, getMyOrders);
router.put('/:id/status', protect, admin, updateOrderStatus);
router.put("/:id/return", protect,admin, returnBook);
router.post("/", protect, createOrder);







module.exports = router;