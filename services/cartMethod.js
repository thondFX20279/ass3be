export const addToCart = (productId) => {
  const productIndex = this.cart.items.findIndex((item) => item.productId.toString() === productId);
  const newQuantity = 1;
  if (productIndex === -1) {
    this.cart.items.push({ productId, quantity: newQuantity });
  } else {
    this.cart.item[productIndex].quantity += 1;
  }
  return this.save();
};
export const removeFromCart = (productId) => {
  this.cart.items = this.cart.items.filter((item) => item.productId.toString() !== productId);
  return this.save();
};

export const clearCart = () => {
  this.cart.items = [];
  return this.save();
};
