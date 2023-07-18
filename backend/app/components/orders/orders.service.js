const OrderDAL = require("./orders.dal");
const dbConfig = require("../../config/index");
const stripe = require("stripe")(dbConfig.stripeApiKey);

class OrderService {
  constructor() {
    this.orderDAL = new OrderDAL();
  }

  async getOrderById(_id) {
    return this.orderDAL.getOrderById(_id);
  }

  async create(orderDetails) {
    return this.orderDAL.create(orderDetails);
  }

  async payment(paymentDetails) {
    try {
      const { paymentMethodId, amount } = paymentDetails;
      const paymentIntent = await stripe.paymentIntents.create({
        amount,
        currency: "usd",
        payment_method: paymentMethodId,
        confirmation_method: "manual",
        confirm: true,
      });
      return { success: true, paymentIntent };
    } catch (error) {
      throw error;
    } finally {
      //finally block
    }
  }
}

module.exports = OrderService;
