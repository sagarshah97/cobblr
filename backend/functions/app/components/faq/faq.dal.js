//Author: Ashish Ojha (B00931967)
const Faq = require("./faq.model");

class FaqDAL {
  async getFaqs() {
    try {
      const categories = await Faq.find();
      return categories;
    } catch (error) {
      console.error("Error retrieving FAQs:", error);
      throw error;
    }
  }
}

module.exports = FaqDAL;
