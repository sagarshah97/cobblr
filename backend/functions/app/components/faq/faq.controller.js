//Author: Ashish Ojha (B00931967)
const FaqService = require("./faq.service");

class FaqController {
  constructor() {
    this.faqService = new FaqService();
  }

  async getFaqs(request, response, next) {
    try {
      const faq = await this.faqService.getFaqs();
      if (faq) {
        response.status(200).json(faq);
      } else {
        response.status(404).json({ error: "No records found." });
      }
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new FaqController();
