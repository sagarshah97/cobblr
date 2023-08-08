//Author: Ashish Ojha (B00931967)
const ContactService = require("./contact.service");

class ContactController {
  constructor() {
    this.contactService = new ContactService();
  }

  async saveMessage(request, response, next) {
    try {
      const messageDetails = await this.contactService.saveMessage(
        request.body
      );
      if (messageDetails.email === request.body.email) {
        response.status(200).json({
          message: "Successfully inserted record.",
          email: messageDetails.email,
        });
      } else {
        response.status(400).json({ error: "Error saving data." });
      }
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new ContactController();
