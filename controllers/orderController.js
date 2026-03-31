const Order = require("../models/Order");
const Book = require("../models/Book");


const createOrder = async (req, res) => {
    try {
        
        const book = await Book.findById(req.body.bookId);

        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }

        if (book.availableCopies <= 0) {
            return res.status(400).json({ message: "No copies available" });
        }

        
        book.availableCopies = book.availableCopies - 1;
        await book.save();

        
        const order = new Order({
            user: req.user._id, 
            book: req.body.bookId
        });

        const savedOrder = await order.save();
        res.status(201).json(savedOrder);

    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};


const returnBook = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);

        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        if (order.isReturned) {
            return res.status(400).json({ message: "Book already returned" });
        }

       
        order.isReturned = true;
        await order.save();

        
        const book = await Book.findById(order.book);
        book.availableCopies = book.availableCopies + 1;
        await book.save();

        res.json({ message: "Book returned successfully", order });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


const getMyOrders = async (req, res) => {
    try {
       
        const orders = await Order.find({ user: req.user._id }).populate("book");
        res.json(orders);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find().populate("user").populate("book");
        res.json(orders);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = { createOrder, returnBook, getMyOrders, getAllOrders };