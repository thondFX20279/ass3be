import createError from "../helpers/createError.js";
import Order from "../models/Order.js";
import User from "../models/User.js";
import sendOrderConfirmation from "../services/sendMail.js";
export const getOrders = async (req, res, next) => {
  try {
    const { isAdmin, limit = 10 } = req.query;

    if (isAdmin) {
      const totalUser = await User.countDocuments({ role: "R1" });
      const orders = await Order.find()
        .limit(limit)
        .populate("items.productId")
        .populate("userId")
        .lean()
        .sort({ createdAt: -1 });

      const totalRevenue = orders.reduce((sum, order) => sum + order.totalPrice, 0);

      const data = { totalUser, orders, totalRevenue };
      return res.status(200).send(data);
    }
    const orders = await Order.find().populate("items.productId").populate("userId");

    const formattedOrders = orders.map((order) => ({
      orderId: order._id,
      userId: order.userId._id,
      fullName: order.userId.fullName,
      phone: order.phone,
      status: order.status,
      address: order.address,
      totalPrice: order.totalPrice,
    }));

    res.status(200).send({ success: true, orders: formattedOrders });
  } catch (error) {
    next(createError(500, "Failed to retrieve orders"));
  }
};
export const createOrders = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).populate("cart.items.productId");
    if (!user) return next(createError(400, "User not found"));

    // Check if the cart is empty
    if (user.cart.items.length === 0) {
      return next(createError(400, "Cart is empty"));
    }

    const { phone, address } = req.body;
    const totalPrice = user.cart.items.reduce((total, item) => total + item.productId.price * item.quantity, 0);

    // Create the new order
    const newOrder = new Order({
      items: user.cart.items.map((item) => ({
        productId: item.productId._id,
        quantity: item.quantity,
      })),
      userId: user._id,
      phone,
      address,
      totalPrice,
    });
    // Save the order
    await newOrder.save();
    await sendOrderConfirmation(user, user.cart.items, newOrder);
    // Clear the cart after order is created
    await user.clearCart();

    res.status(201).json({ success: true, message: "Order created successfully", order: newOrder });
  } catch (error) {
    next(error);
  }
};
export const getOrder = async (req, res, next) => {
  try {
    const { orderId } = req.params;
    if (!orderId) return next(createError(400, "Order not found"));
    const order = await Order.findById(orderId).populate("items.productId").populate("userId", "fullName").lean();
    const formatedOrder = {
      ...order,
      items: order.items.map((item) => ({ ...item.productId, quantity: item.quantity })),
    };
    res.status(200).send({ success: true, order: formatedOrder });
  } catch (error) {
    next(error);
  }
};
