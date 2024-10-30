// controllers/shop.js

import User from "../models/User.js";

export const getCart = async (req, res, next) => {
  const userId = req.user.id;

  try {
    // Find the user by their ID and populate the cart with product details
    const user = await User.findById(userId).populate("cart.items.productId");

    if (!user) {
      return res.status(404).send({ success: false, message: "User not found" });
    }

    // Map the cart items to include the necessary product details
    const cartItems = user.cart.items.map((item) => {
      return {
        id: item.productId._id,
        name: item.productId.name,
        price: item.productId.price,
        image: item.productId.img1,
        quantity: item.quantity,
        total: item.productId.price * item.quantity,
      };
    });

    res.status(200).send({
      success: true,
      cart: {
        items: cartItems,
        totalPrice: cartItems.reduce((total, item) => total + item.total, 0),
      },
    });
  } catch (error) {
    next(error);
  }
};

export const addProductToCart = async (req, res, next) => {
  const { productId, quantity = 1 } = req.body;
  const userId = req.user.id;

  try {
    const user = await User.findById(userId);

    await user.addToCart(productId, +quantity);
    res.status(200).send({ success: true, message: "Product added to cart" });
  } catch (error) {
    next(error);
  }
};

export const removeProductFromCart = async (req, res, next) => {
  const { productId } = req.params;
  const userId = req.user.id;

  try {
    const user = await User.findById(userId);
    await user.removeFromCart(productId);
    res.status(200).send({ success: true, message: "Product removed from cart" });
  } catch (error) {
    next(error);
  }
};

export const clearUserCart = async (req, res, next) => {
  const userId = req.user.id;

  try {
    const user = await User.findById(userId);
    await user.clearCart();
    res.status(200).send({ success: true, message: "Cart cleared" });
  } catch (error) {
    next(error);
  }
};

export const increaseProductQuantity = async (req, res, next) => {
  const { productId } = req.params;
  const userId = req.user.id;

  try {
    const user = await User.findById(userId);
    await user.increaseCart(productId);
    res.status(200).send({ success: true, message: "Product quantity increased" });
  } catch (error) {
    next(error);
  }
};

export const decreaseProductQuantity = async (req, res, next) => {
  const { productId } = req.params;
  const userId = req.user.id;

  try {
    const user = await User.findById(userId);
    await user.decreaseCart(productId);
    res.status(200).send({ success: true, message: "Product quantity decreased" });
  } catch (error) {
    next(error);
  }
};
