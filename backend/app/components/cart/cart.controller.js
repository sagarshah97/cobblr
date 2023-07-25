const CartService = require("./cart.service");

class CartController {
  constructor() {
    this.cartService = new CartService();
  }

  async getCart(req, res) {
    try {
      const { userId } = req.body;
      const cart = await this.cartService.getCart(userId);
      res.json(cart);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async updateCartTotals(req, res) {
    try {
      const { userId, subtotal, tax, total } = req.body;
      await this.cartService.updateCartTotals(userId, subtotal, tax, total);
      res.json({ message: "Cart totals updated successfully" });
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async addToCart(req, res) {
    try {
      const { userId, cartItem } = req.body;
      const updatedCart = await this.cartService.addToCart(userId, cartItem);
      res.json(updatedCart);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async updateCartItemQuantity(req, res) {
    try {
      const { userId, cartItemId, quantity, size } = req.body;
      const updatedCart = await this.cartService.updateCartItemQuantity(
        userId,
        cartItemId,
        quantity,
        size
      );

      res.json(updatedCart);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async removeCartItem(req, res) {
    try {
      const { userId, cartItemId, quantity, size } = req.body;

      const updatedCart = await this.cartService.removeCartItem(
        userId,
        cartItemId,
        quantity,
        size
      );

      res.json(updatedCart);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
}

const cartController = new CartController();

module.exports = cartController;
