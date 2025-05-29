const express = require("express");
const router = express.Router();
const Product = require("../model/productmodel");
const mongoose = require("mongoose");

// router.get('/list') get request
router.get("/", (req, res, next) => {
  Product.find()
    .then((result) => {
      res.status(200).json({
        status: true,
        message: "Product fetched successfully",
        data: result,
      });
    })
    .catch((err) => {
      res.status(500).json({
        status: false,
        message: "Error fetching products",
        error: err,
      });
    });
});
// this is a post request
router.post("/", (req, res, next) => {
  const product = new Product({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    price: req.body.price,
    productImage: req.body.productImage,
    description: req.body.description,
  });
  product.save().then((result) => {
    console.log(result);
    res.status(200).json({
      status: true,
      message: "Product created successfully",
    });
  });
});
// get request for a specific product
router.get("/:productId", (req, res, next) => {
  const id = req.params.productId;
  console.log(id);
  Product.findById(id)
    .then((result) => {
      if (result) {
        res.status(200).json({
          status: true,
          message: "Product fetched successfully",
          data: result,
        });
      } else {
        res.status(404).json({
          status: false,
          message: "Product not found",
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        status: false,
        message: "Error fetching product",
        error: err,
      });
    });
});

// this is a delete request
router.delete("/:productId", (req, res, next) => {
  const id = req.params.productId;
  Product.deleteOne({ _id: id })
    .then((result) => {
      res.status(200).json({
        status: true,
        message: "Product deleted successfully",
        data: result,
      });
    })
    .catch((err) => {
      res.status(500).json({
        status: false,
        message: "Error deleting product",
        error: err,
      });
    });
});
// this is a put request
router.put("/:productId", (req, res, next) => {
  const id = req.params.productId;

  Product.findOneAndUpdate(
    { _id: id },

    {
      $set: {
        name: req.body.name,
        price: req.body.price,
        productImage: req.body.productImage,
        description: req.body.description,
      },
    }
  )
    .then((result) => {
      res.status(200).json({
        status: true,
        message: "Product updated successfully",
      });
    })
    .catch((err) => {
      res.status(500).json({
        status: false,
        message: "Error updating product",
        error: err,
      });
    });
});

module.exports = router;
