export const addToCart = function (productId, quantity) {
  const productIndex = this.cart.items.findIndex((item) => item.productId.toString() === productId);
  if (productIndex === -1) {
    this.cart.items.push({ productId, quantity: quantity });
  } else {
    this.cart.items[productIndex].quantity += quantity;
  }
  return this.save();
};
export const removeFromCart = function (productId) {
  this.cart.items = this.cart.items.filter((item) => item.productId.toString() !== productId);
  return this.save();
};
export const increaseCart = function (productId) {
  const productIndex = this.cart.items.findIndex((item) => item.productId.toString() === productId);
  if (productIndex === -1) throw new Error("Product in cart not found");
  this.cart.items[productIndex].quantity += 1;
  return this.save();
};
export const decreaseCart = function (productId) {
  const productIndex = this.cart.items.findIndex((item) => item.productId.toString() === productId);
  if (productIndex === -1) throw new Error("Product in cart not found");
  this.cart.items[productIndex].quantity -= 1;
  return this.save();
};

export const clearCart = function () {
  this.cart.items = [];
  return this.save();
};
