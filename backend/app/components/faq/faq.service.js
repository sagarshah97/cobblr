const FaqDAL = require("./faq.dal");

class FaqService {
  constructor() {
    this.faqDAL = new FaqDAL();
  }
  
  async getFaqs() {
    try {
      const faq = await this.faqDAL.getFaqs();
      console.log("In Service",faq);
      return faq;
    } catch (error) {
      console.log("In Service error",error);
      throw error;
    } finally {
      //finally block
    }
  }
}

module.exports = FaqService;
