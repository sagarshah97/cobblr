require("dotenv-safe").config({
  path: "./.config/.env",
  allowEmptyValues: false,
});

module.exports = {
  HOST: process.env.DB_HOST,
  USER: process.env.DB_USER,
  PASSWORD: process.env.DB_PASSWORD,
  DB: process.env.DB_NAME,
  CLUSTER: process.env.DB_CLUSTER,
  TLD: process.env.DB_TLD,
  jwtConfig: {
    secretKey: process.env.JWT_SECRET_KEY,
    timeout: process.env.JWT_TIMEOUt,
    timeoutWithRememberedMe: process.env.TIMEOUT_WITH_REMEMBERED_ME,
    timeoutWithoutRememberedMe: process.env.TIMEOUT_WITHOUT_REMEMBERED_ME,
  },
};
