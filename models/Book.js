const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Book title is required"],
      trim: true,
      minlength: [3, "Title is too short, minimum 3 characters"],
      maxlength: [100, "Title is too long, maximum 100 characters"]
    },

    author: {
      type: String,
      required: [true, "Author name is required"],
      trim: true,
      minlength: [3, "Author name must be at least 3 characters"]
    },

    category: {
      type: String,
      required: [true, "Category is required"],
      // enum: {
      //   values: ["Programming", "Fiction", "Science", "History", "Biography", "Other"],
      //   message: "{VALUE} is not a supported category"
      // }
    },

    price: {
      type: Number,
      required: [true, "Price is required"],
      min: [1, "Price must be at least 1"],
      max: [10000, "Price cannot exceed 10,000"]
    },

    availableCopies: {
      type: Number,
      required: [true, "Available copies is required"],
      default: 0,
      min: [0, "Copies cannot be less than zero"],
      max: [500, "Inventory limit is 500 copies per book"]
    },

    image: {
      type: String,
      default: "https://img.freepik.com/free-vector/vector-blank-book-cover-isolated-white_1284-41904.jpg?semt=ais_incoming&w=740&q=80",
      match: [/^https?:\/\/.+/, "Please enter a valid image URL"]
    },

    description: { 
      type: String,
      required: [true, "Description is required"],
      minlength: [10, "Description should be at least 10 characters"],
      maxlength: [1000, "Description cannot exceed 1000 characters"]
    }
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Book", bookSchema);