const express = require("express");
const router = express.Router();
const User = require("../../models/User");

router.get("/health", (req, res) => res.json({ msg: "users api is working" }));

router.post("/addUser", async (req, res) => {
  const { name, email, password, contactNumber } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: "User already exits" });
    }
    user = new User({
      name,
      email,
      password,
      contactNumber,
    });
    const users = await user.save();
    return res.json(users);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server error");
  }
});

router.get("/user/:id", async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id });
    if (!user) {
      res.json({ msg: "User not found" });
      return;
    }
    res.json(user);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
