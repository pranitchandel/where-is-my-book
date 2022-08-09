const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../../models/User");
const Product = require("../../models/Product");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

router.get("/health", (req, res) => res.json({ msg: "users api is working" }));

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (!user) return res.status(404).json({ msg: "User not found" });
    //check password
    bcrypt.compare(password, user.password).then((isMatch) => {
      if (isMatch) {
        const payload = { id: user.id, name: user.name };

        jwt.sign(
          payload,
          process.env.SECRETKEY,
          { expiresIn: 60000 },
          (err, token) => {
            res.json({
              sucess: true,
              token: "Bearer " + token,
            });
          }
        );
      } else {
        return res.status(400).json({ msg: "Password incorrect" });
      }
    });
  } catch (err) {
    return res.status(500).json("Server error");
  }
});

router.post("/register", async (req, res) => {
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
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(user.password, salt, (err, hash) => {
        if (err) throw err;
        user.password = hash;
        user
          .save()
          .then((user) => res.json(user))
          .catch((err) => console.log(err));
      });
    });
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

router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({
      id: req.user.id,
      name: req.user.name,
      email: req.user.email,
    });
  }
);

router.post("/addWishlist/:userId/:productId", async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.userId });
    const productId = req.params.productId;
    for (let prodId in user.wishList) {
      if (productId === user.wishList[prodId].productId) {
        return res.json({
          msg: "FAILURE",
          wishlist: user.wishList,
        });
      }
    }
    user.wishList.push({ productId });
    user
      .save()
      .then((user) =>
        res.json({
          msg: "SUCCESS",
          wishlist: user.wishList,
        })
      )
      .catch((err) => console.log(err));
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server error");
  }
});

router.post("/deleteFromWishlist/:userId/:productId", async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.userId });
    const productId = req.params.productId;
    const newWishlist = user.wishList.filter(
      (wish) => wish.productId !== productId
    );
    user.wishList = newWishlist;

    user
      .save()
      .then((user) =>
        res.json({
          msg: "SUCCESS",
          wishlist: user.wishList,
        })
      )
      .catch((err) => console.log(err));
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server error");
  }
});

router.get("/checkWishlist/:userId/:productId", async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.userId });
    const productId = req.params.productId;
    for (let prodId in user.wishList) {
      if (productId === user.wishList[prodId].productId) {
        return res.json({
          msg: "FAILURE",
          wishlist: user.wishList,
        });
      }
    }
    res.json({
      msg: "SUCCESS",
      wishlist: user.wishList,
    });
  } catch (err) {
    res.status(500).send("Server error");
  }
});

router.get("/getWishlist/:userId", async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.userId });
    if (!user) {
      res.json({ msg: "User not found" });
      return;
    }
    res.json({ msg: "SUCCESS", wishlist: user.wishList });
  } catch (err) {
    res.status(500).send("Server error");
  }
});
module.exports = router;
