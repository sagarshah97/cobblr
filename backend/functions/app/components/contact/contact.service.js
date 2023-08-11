//Author: Ashish Ojha (B00931967)
const ContactDal = require("./contact.dal");

class ContactService {
  constructor() {
    this.contactDal = new ContactDal();
  }

  async saveMessage(messageDetails) {
    try {
      return await this.contactDal.saveMessage(messageDetails);
    } catch (error) {
      throw error;
    } finally {
      //finally block
    }
  }
}

module.exports = ContactService;
