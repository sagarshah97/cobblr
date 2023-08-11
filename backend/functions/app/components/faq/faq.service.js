//Author: Ashish Ojha (B00931967)
const FaqDAL = require("./faq.dal");

class FaqService {
  constructor() {
    this.faqDAL = new FaqDAL();
  }

  async getFaqs() {
    try {
      const faq = await this.faqDAL.getFaqs();
      return faq;
    } catch (error) {
      throw error;
    } finally {
      //finally block
    }
  }
}

module.exports = FaqService;
