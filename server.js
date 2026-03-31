const express = require("express");
const app = express();
require("dotenv").config();
const connectDB = require("./config/db");
const bookRoutes = require("./routes/bookRoutes");
const orderRoutes = require("./routes/orderRoutes");
const PORT = process.env.PORT || 5000;

const userRoutes = require("./routes/userRoutes");


app.use(express.json());

app.get("/", (req, res) => res.send("Book Store API running"));
app.use("/api/users", userRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/orders", orderRoutes);

connectDB();

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));



