const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./db");
const cors = require("cors");
const passport = require("passport");
const users = require("./routes/api/users");
const products = require("./routes/api/products");

connectDB();

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

//Passport middleware
app.use(passport.initialize());

//Passport config
require("./config/passport")(passport);

app.use("/api/users", users);
app.use("/api/products", products);
const port = process.env.PORT;
app.listen(port, () => console.log(`Server running on port ${port}`));
