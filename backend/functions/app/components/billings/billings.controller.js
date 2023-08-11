// Author: Sagar Paresh Shah (B00930009)

const BillingsService = require("./billings.service");

class BillingController {
  constructor() {
    this.billingsService = new BillingsService();
  }

  async getFinalOrder(request, response, next) {
    try {
      const cartDetails = await this.billingsService.getFinalOrder(
        request.body.userId
      );
      if (cartDetails) {
        response.status(200).json(cartDetails);
      } else {
        response.status(404).json({ error: "No record found." });
      }
    } catch (error) {
      next(error);
    }
  }

  async payment(request, response, next) {
    try {
      const paymentStatus = await this.billingsService.payment(request.body);
      if (paymentStatus.success === true) {
        response.status(200).json(paymentStatus);
      } else {
        response
          .status(400)
          .json({ error: "Error occurred while making payment." });
      }
    } catch (error) {
      next(error);
    }
  }

  async create(request, response, next) {
    try {
      const createdOrderId = await this.billingsService.create(request.body);
      response.status(200).json({ _id: createdOrderId });
    } catch (error) {
      next(error);
    }
  }

  async clearCart(request, response, next) {
    try {
      const cartDetails = await this.billingsService.clearCart(
        request.body.userId
      );
      if (cartDetails.modifiedCount) {
        response.status(200).json({ message: "Cart emptied." });
      } else {
        response.status(404).json({ error: "No record found." });
      }
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new BillingController();
