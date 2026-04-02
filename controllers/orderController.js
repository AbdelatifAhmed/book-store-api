const Order = require("../models/Order");
const Book = require("../models/Book");

const createOrder = async (req, res) => {
    try {
        const existingOrder = await Order.findOne({
            user: req.user._id,
            book: req.body.bookId,
            isReturned: false 
        });

        if (existingOrder) {
            return res.status(400).json({ message: "You already have an active request for this book" });
        }

        const book = await Book.findById(req.body.bookId);
        if (!book || book.availableCopies <= 0) {
            return res.status(400).json({ message: "Book not available" });
        }

        book.availableCopies -= 1;
        await book.save();

        const order = new Order({
            user: req.user._id,
            book: req.body.bookId
        });

        await order.save();
        res.status(201).json({ message: "Order placed successfully" });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

const returnBook = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (!order) return res.status(404).json({ message: "Order not found" });
        if (order.isReturned) return res.status(400).json({ message: "Book already returned" });

        order.isReturned = true;
        await order.save();

        const book = await Book.findById(order.book);
        if (book) {
            book.availableCopies += 1;
            await book.save();
        }

        res.json({ message: "Book returned successfully", order });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getMyOrders = async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user.id })
            .populate("book")
            .sort({ createdAt: -1 });
        res.json(orders);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "name email") 
      .populate("book", "title price image")
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateOrderStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const order = await Order.findById(req.params.id);

        if (!order) return res.status(404).json({ message: "Order not found" });

        if (status === "Rejected" && order.status !== "Rejected") {
            const book = await Book.findById(order.book);
            if (book) {
                book.availableCopies += 1; 
                await book.save();
            }
        }

        order.status = status;
        await order.save();
        res.json({ status: 200, message: `Order updated to ${status}`, order });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

module.exports = { createOrder, returnBook, getMyOrders, getAllOrders, updateOrderStatus };