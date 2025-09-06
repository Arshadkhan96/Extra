const Product = require("../models/productModel");
const CatchError = require("../resources/catcherror");
const tryCatcherror = require("../Middleware/tryCatcherror");
const ApiFeatures = require("../resources/apiFeatures");


exports.createProduct = tryCatcherror(async (req, res, next) => {
  const product = await Product.create(req.body);
  res.status(201).json({
    success: true,
    product,
  });
});

exports.findAllProduct = tryCatcherror(async (req, res) => {
  const productPerPage = 8;
  const totalProduct = await Product.countDocuments();
  const apiFeatures = new ApiFeatures(Product.find(), req.query)
    .search()
    .filter()
    .pagination(productPerPage);
  const product = await apiFeatures.query;
  res.status(200).json({
    success: true,
    product,
    totalProduct,
    productPerPage
  });
});

exports.updateProduct = tryCatcherror(async (req, res, next) => {
  const updateProduct = await Product.updateMany(req.params, {
    $set: req.body,
  });
  if (!updateProduct) {
    return next(new CatchError("product not found", 404));
  }
  res.status(200).json({
    success: true,
    message: "Product updated successfully",
  });
});

exports.deleteProduct = tryCatcherror(async (req, res, next) => {
  const deleteProduct = await Product.deleteOne(req.params);
  if (!deleteProduct) {
    return next(new CatchError("product not found", 404));
  }
  res.status(200).json({
    success: true,
    message: "Product deleted successfully",
  });
});

exports.findProduct = tryCatcherror(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return next(new CatchError("product not found", 404));
  }
  res.status(200).json({
    success: true,
    product,
  });
});

///////////////////new product review////

exports.productReview = tryCatcherror(async (req, res, next) => {
  const { rating, comment, productId } = req.body;

  console.log("Request Body", req.body);

  // Validate productId
  const mongoose = require("mongoose");
  if (!mongoose.Types.ObjectId.isValid(productId)) {
    return next(new CatchError("Invalid Product ID", 400));
  }

  // Find the product//
  const product = await Product.findById(productId);
  console.log("product not found:", product);

  if (!product) {
    return next(new CatchError("product not found", 404));
  }
  // create a review object
  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };

  //   // Check if the user already reviewed this product

  const isReviewed = product.reviews.find(
    (rev) => rev.user.toString() === req.user._id.toString()
  );

  if (isReviewed) {
    //Update the review
    product.reviews.forEach((rev) => {
      if (rev.user.toString() === req.user._id.toString())
        (rev.rating = rating), (rev.comment = comment);
    });
  } else {
    //Add a new review
    product.reviews.push(review);
    product.numberOfReviews = product.reviews.length;
  }

  //Calculate the average rating
  const totalRatings = product.reviews.reduce(
    (sum, rev) => sum + rev.rating,
    0
  );
  product.ratings = totalRatings / product.reviews.length;

  // // Save the product
  await product.save({
    validateBeforeSave: false,
  });

  // // Respond with success
  res.status(200).json({
    success: true,
    message: "Review added successfully",
  });
});
