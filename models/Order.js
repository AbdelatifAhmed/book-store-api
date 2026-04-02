const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: [true, "User ID is required for an order"],
        },

        book: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Book",
            required: [true, "Book ID is required for an order"],
        },

        isReturned: {
            type: Boolean,
            default: false,
        },

        status: {
            type: String,
            required: true,
            enum: {
                values: ["pending", "approved", "rejected"],
                message: "{VALUE} is not a valid order status"
            },
            default: "pending",
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Order", orderSchema);