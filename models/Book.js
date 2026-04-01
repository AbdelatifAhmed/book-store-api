const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    author: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },

    availableCopies: {
      type: Number,
      default: 0,
      min: 0,
    },
    image: {
      type: String,
      default: "https://img.freepik.com/free-vector/vector-blank-book-cover-isolated-white_1284-41904.jpg?semt=ais_incoming&w=740&q=80"
    },
    description: { type: String }
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Book", bookSchema);
