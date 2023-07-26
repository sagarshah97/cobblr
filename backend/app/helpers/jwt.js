// const jwt = require("jsonwebtoken");
// const expressJwt = require("express-jwt");
// const { jwtConfig } = require("../config");

// module.exports = {
//   generateJwtWebToken: (userId, role, keepUserLoggedIn) => {
//     const expiresIn = keepUserLoggedIn
//       ? jwtConfig.timeoutWithRememberedMe
//       : jwtConfig.timeoutWithoutRememberedMe;
//     const token = jwt.sign(
//       {
//         id: userId,
//         role: role,
//       },
//       jwtConfig.secretKey,
//       { expiresIn }
//     );
//     return token;
//   },

//   authenticateJwt: expressJwt.expressjwt({
//     secret: jwtConfig.secretKey,
//     algorithms: ["HS256"],
//   }),

//   decodeJwtToken: async (token) => {
//     const payload = await jwt.decode(token);
//     return payload;
//   },
// };

const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt");
const { jwtConfig } = require("../config");

module.exports = {
  generateJwtWebToken: (userId) => {
    const expiresIn = jwtConfig.timeout;
    const token = jwt.sign(
      {
        id: userId,
      },
      jwtConfig.secretKey,
      { expiresIn }
    );
    return token;
  },

  generateEmailVerificationToken: (email) => {
    const token = jwt.sign(
      {
        email: email,
      },
      jwtConfig.secretKey
    );
    return token;
  },

  // authenticateJwt: expressJwt({
  //   secret: jwtConfig.secretKey,
  //   algorithms: ["HS256"],
  // }),

  // decodeJwtToken: async (token) => {
  //   const payload = await jwt.decode(token);
  //   return payload;
  // },

  verifyJwtToken: (token) => {
    jwt.verify(token, jwtConfig.secretKey, (error, decoded) => {
      if (error) {
        return false;
      } else {
        return true;
      }
    });
  },
};
