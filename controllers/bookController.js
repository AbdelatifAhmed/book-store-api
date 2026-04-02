const Book = require("../models/Book");

exports.createBook = async (req, res) => {
  try {
    const book = await Book.create(req.body);

    res.status(201).json({
      message: "Book created successfully",
      book,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAllBooks = async (req, res) => {
  try {
    const books = await Book.find().sort({ createdAt: -1 });

    res.json(books);
  } catch (error) {
    res.status(500).json({ status: 500, message: error.message });
  }
};

exports.getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) return res.status(404).json({ status: 404, message: "Book not found" });

    res.json(book);
  } catch (error) {
    res.status(500).json({ status: 500, message: error.message });
  }
};

exports.updateBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!book) return res.status(404).json({ status: 404, message: "Book not found" });

    res.json({
      message: "Book updated",
      book,
    });
  } catch (error) {
    res.status(500).json({ status: 500, message: error.message });
  }
};

exports.deleteBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);

    if (!book) return res.status(404).json({ status: 404, message: "Book not found" });

    res.json({
      message: "Book deleted",
    });
  } catch (error) {
    res.status(500).json({ status: 500, message: error.message });
  }
};
