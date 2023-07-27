//Author: Ashish Ojha (B00931967)
const messages = require("./contact.model");

class ContactDal {
  async saveMessage(messageDetails) {
    const message = new messages(messageDetails);
    if (!message) {
      return err;
    }

    try {
      const response = await message.save();
      return response;
    } catch (error) {
      return error;
    }
  }
}

module.exports = ContactDal;
