const express = require('express')
const {
  findProduct,
  createProduct,
  findAllProduct,
  updateProduct,
  deleteProduct,
  productReview,
} = require("../controller/productController");
const {isAuthenticated} = require('../Middleware/authenticate')

const router = express.Router();
router.route("/product/:id").get(findProduct)
router.route("/products/create").post(createProduct)
router.route("/products").get(findAllProduct)
router.route("/products/update/:_id").put(updateProduct)
router.route("/products/delete/:_id").delete(deleteProduct)
router.route("/review").put(isAuthenticated, productReview )

module.exports = router;