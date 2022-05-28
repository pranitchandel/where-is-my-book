const express = require("express");
const router = express.Router();

const Product = require("../../models/Product");

router.get("/health", (req, res) =>
  res.json({ msg: "product api is working" })
);

router.get("/product/all", async (req, res) => {
  const allProducts = await Product.find();
  console.log(allProducts);
  return res.json({ allProducts });
});
router.get("/product/:id", async (req, res) => {
  try {
    const product = await Product.findOne({ _id: req.params.id });
    if (!product) {
      res.json({ msg: "Product not found" });
      return;
    }
    res.json(product);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server error");
  }
});

router.post("/addProduct", async (req, res) => {
  const {
    name,
    price,
    currentDiscount,
    rating,
    genre,
    language,
    author,
    arrivalDate,
    ageGroup,
    typeOfBinding,
    isReturnable,
    isbn,
    numberOfPages,
    width,
    height,
    imageUrl,
  } = req.body;
  let product = await Product.findOne({ isbn });
  if (product) {
    return res
      .status(400)
      .json({ msg: `Book already exists with isbn ${isbn}` });
  }
  product = new Product({
    name,
    price,
    currentDiscount,
    rating,
    genre,
    language,
    author,
    arrivalDate,
    ageGroup,
    typeOfBinding,
    isReturnable,
    isbn,
    numberOfPages,
    width,
    height,
    imageUrl,
  });
  const products = await product.save();
  return res.json(products);
});

router.get("/product", async (req, res) => {
  const allProducts = await Product.find();
  const filters = req.query;
  let filteredProduct = [];
  filteredProduct = allProducts.filter((product) => {
    let isValid = true;
    for (key in filters) {
      isValid = isValid && product[key] === filters[key];
    }
    return isValid;
  });
  if (filteredProduct.length === 0) {
    return res.send({ msg: "FAILURE", filteredProduct });
  }
  return res.json({ msg: "SUCCESS", filteredProduct });
});
module.exports = router;
