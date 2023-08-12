// Author: Sagar Paresh Shah (B00930009)
const BillingsDAL = require("./billings.dal");
const dbConfig = require("../../config/index");
const stripe = require("stripe")(dbConfig.stripeApiKey);

class BillingService {
  constructor() {
    this.billingsDAL = new BillingsDAL();
  }

  async getFinalOrder(_id) {
    try {
      const cartDetails = await this.billingsDAL.getFinalOrder(_id);
      return cartDetails;
    } catch (error) {
      throw error;
    } finally {
      //finally block
    }
  }

  async create(orderDetails) {
    return this.billingsDAL.create(orderDetails);
  }

  async clearCart(userId) {
    return this.billingsDAL.clearCart(userId);
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

module.exports = BillingService;
