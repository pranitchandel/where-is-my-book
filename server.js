const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./db");
const users = require("./routes/api/users");
const products = require("./routes/api/products");

connectDB();

dotenv.config();
const app = express();
app.use(express.json());
app.get("/", (req, res) => res.send("Hello World"));
app.use("/api/users", users);
app.use("/api/products", products);
const port = process.env.PORT;
app.listen(port, () => console.log(`Server running on port ${port}`));
