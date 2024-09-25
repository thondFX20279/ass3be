import createError from "../helpers/createError.js";
import Product from "../models/Product.js";

export const getCategories = async (req, res, next) => {
  try {
    try {
      const representatives = await Product.aggregate([
        {
          $group: {
            _id: "$category",
            product: { $first: "$$ROOT" },
          },
        },
      ]);

      if (!representatives.length) {
        return next(createError(404, "No Categories Found"));
      }

      res.status(200).send({ success: true, categories: representatives });
    } catch (error) {
      next(error);
    }
  } catch (error) {}
};

export const getTopTrending = async (req, res, next) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 }).limit(8);
    if (!products.length) {
      return next(createError(404, "No trending products found"));
    }
    res.status(200).send({ success: true, topTrending: products });
  } catch (error) {
    next(error);
  }
};

export const getProducts = async (req, res, next) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const pageNum = parseInt(page, 10);
    const limitNum = parseInt(limit, 10);
    const totalProducts = await Product.countDocuments();
    const products = await Product.find()
      .skip((pageNum - 1) * limitNum)
      .limit(limitNum);
    res.status(200).send({
      success: true,
      message: "Get all products Success",
      status: 200,
      products,
      total: totalProducts,
      page: pageNum,
      totalPages: Math.ceil(totalProducts / limitNum),
    });
  } catch (error) {
    next(error);
  }
};
export const getRelatedProduct = async (req, res, next) => {
  try {
    const { productId } = req.params;
    const product = await Product.findById(productId);
    if (!product) return next(createError(404, "Product Not Found"));
    const category = product.category;
    const relatedProducts = await Product.find({
      category,
      _id: { $ne: productId },
    });
    res.status(200).send({ success: true, relatedProducts });
  } catch (error) {
    next(error);
  }
};
export const createProduct = async (req, res, next) => {};
export const getProductById = async (req, res, next) => {
  const { productId } = req.params;
  console.log(productId);

  const product = await Product.findById(productId);

  if (!product) return next(createError(404, "Product Not Found"));
  res.status(200).send({ success: true, product });
};
export const updateProductById = async (req, res, next) => {};
export const deleteProductById = async (req, res, next) => {};
