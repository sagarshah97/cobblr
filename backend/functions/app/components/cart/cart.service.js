// Author: Pratik Mukund Parmar (B00934515)

const CartDal = require("./cart.dal");

class CartService {
  constructor() {
    this.cartDal = new CartDal();
  }

  async getCart(userId) {
    try {
      const cart = await this.cartDal.getCart(userId);
      return cart;
    } catch (error) {
      throw error;
    }
  }

  async updateCartTotals(userId, subtotal, tax, total) {
    try {
      await this.cartDal.updateCartTotals(userId, subtotal, tax, total);
    } catch (error) {
      throw error;
    }
  }

  async addToCart(reqBody) {
    try {
      const response = await this.cartDal.addToCart(reqBody);
      return response;
    } catch (error) {
      throw error;
    }
  }

  async updateCartItemQuantity(userId, cartItemId, quantity, size) {
    try {
      const updatedCart = await this.cartDal.updateCartItemQuantity(
        userId,
        cartItemId,
        quantity,
        size
      );
      return updatedCart;
    } catch (error) {
      throw error;
    }
  }

  async removeCartItem(userId, cartItemId, quantity, size) {
    try {
      const updatedCart = await this.cartDal.removeCartItem(
        userId,
        cartItemId,
        quantity,
        size
      );
      return updatedCart;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = CartService;
