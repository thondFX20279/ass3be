import mongoose from "mongoose";
import { addToCart, removeFromCart, clearCart, increaseCart, decreaseCart } from "../services/cartMethod.js";

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    fullName: { type: String, required: true },
    cart: {
      items: [
        {
          productId: { type: mongoose.SchemaTypes.ObjectId, ref: "Product", required: true },
          quantity: { type: Number, required: true, default: 1 },
        },
      ],
    },
    role: {
      type: String,
      enum: ["R1", "R2", "R3"],
      default: "Customer",
    },
  },
  { timestamps: true }
);

userSchema.methods.addToCart = addToCart;
userSchema.methods.removeFromCart = removeFromCart;
userSchema.methods.clearCart = clearCart;
userSchema.methods.increaseCart = increaseCart;
userSchema.methods.decreaseCart = decreaseCart;

const User = mongoose.model("User", userSchema);

export default User;
