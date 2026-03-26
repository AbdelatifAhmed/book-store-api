const express = require("express");
const app = express();
require("dotenv").config()
const connectDB = require("./config/db");
const PORT = process.env.PORT || 5000;


app.use(express.json());

app.get('/', (req, res) => res.send('Book Store API running'));

connectDB()

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

