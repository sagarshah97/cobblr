// Author: Sagar Paresh Shah (B00930009)

const HOST = "cobblr";
const USER = "aayushypandya";
const PASSWORD = "adminadmin";
const DB = "cobblr";
const CLUSTER = "csci-5709";
const TLD = "m6riq79";
const jwtConfig = {
  secretKey: "atsd3ygd8236r87qgd9wa8dhq8",
  timeout: 7200000,
};
const stripeApiKey =
  "sk_test_51NQaRTG6OTDlGgErIzLxYcY7MQ4c2bNYT2CmckA0yRMQcBhyya5wFNDk1ONJWZS2c2dnl49HfPYA8h7TyvIWAaWg00dvrlhtsw";
const sendGridApiKey =
  "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";
const frontendBaseUrl = "https://cobblr-store.netlify.app";
const cobblrEmail = "cobblr5709@gmail.com";

module.exports = {
  HOST,
  USER,
  PASSWORD,
  DB,
  CLUSTER,
  TLD,
  jwtConfig,
  stripeApiKey,
  sendGridApiKey,
  frontendBaseUrl,
  cobblrEmail,
};
