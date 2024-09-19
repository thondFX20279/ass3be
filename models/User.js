import mongoose from "mongoose";
import { addToCart, removeFromCart, clearCart } from "../services/cartMethod";

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    cart: {
      items: [
        {
          productId: { type: mongoose.SchemaTypes.ObjectId, ref: "Product", required: true },
          quantity: { type: Number, required: true, default: 1 },
        },
      ],
    },
  },
  { timestamps: true }
);

userSchema.methods.addToCart = addToCart;
userSchema.methods.removeFromCart = removeFromCart;
userSchema.methods.clearCart = clearCart;
const User = mongoose.model("User", userSchema);

export default User;
