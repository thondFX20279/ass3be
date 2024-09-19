import Product from "../models/Product.js";
export const getProducts = async (req, res, next) => {
  const products = await Product.find();
  res.status(200).send({
    success: true,
    message: "Get all products Success",
    status: 200,
    data: products,
  });
};
export const createProduct = async (req, res, next) => {};
export const getProductById = async (req, res, next) => {};
export const updateProductById = async (req, res, next) => {};
export const deleteProductById = async (req, res, next) => {};
