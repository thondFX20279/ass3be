import createError from "../helpers/createError.js";
import Product from "../models/Product.js";
import fs from "fs";
import path from "path";
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
      .limit(limitNum)
      .sort({ createdAt: -1 });
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
export const createProduct = async (req, res, next) => {
  try {
    const { name, category, price, short_desc, long_desc } = req.body;
    const images = req.files.map((file) => `${process.env.BASE_URL}/images/${file.filename}`);
    const newProduct = new Product({
      name,
      category,
      price,
      short_desc,
      long_desc,
      img1: images[0],
      img2: images[1] || null,
      img3: images[2] || null,
      img4: images[3] || null,
    });
    const savedProduct = await newProduct.save();
    res.status(201).send({ success: true, product: savedProduct });
  } catch (error) {
    next(error);
  }
};
export const getProductById = async (req, res, next) => {
  const { productId } = req.params;

  const product = await Product.findById(productId);

  if (!product) return next(createError(404, "Product Not Found"));
  res.status(200).send({ success: true, product });
};
export const deleteProduct = async (req, res, next) => {
  try {
    const { productId } = req.params;
    const product = await Product.findById(productId);
    if (!product) return next(createError(404, "Product Not Found"));

    const imageUrls = [product.img1, product.img2, product.img3];
    imageUrls.forEach((url) => {
      if (url) {
        const fileName = url.split("/").pop();
        const imagePath = path.join(__basedir, "images", fileName);

        fs.unlink(imagePath, (err) => {
          if (err) {
            console.error(`Failed to delete image: ${imagePath}`, err);
          }
        });
      }
    });
    await Product.findByIdAndDelete(productId);

    res.status(200).send({ success: true, message: "Product deleted successfully." });
  } catch (error) {
    next(error);
  }
};
