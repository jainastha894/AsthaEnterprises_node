const Product = require("../models/product.js");


const getAllProducts = async () => {
  return await Product.find();
};

module.exports = { getAllProducts };