const express = require("express");
const app = express();
require("dotenv").config();
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");

const PORT = process.env.PORT || 5000;

app.use(express.json());

app.use("/api/users", userRoutes);

app.get("/", (req, res) => res.send("Book Store API running"));

connectDB().then(() => {
  app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
});