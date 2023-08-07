const jwt = require("jsonwebtoken");
// const { expressjwt } = require("express-jwt");
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

  // authenticateJwt: jwt.verify({
  //   secret: jwtConfig.secretKey,
  //   algorithms: ["HS256"],
  // }),

  verifyToken: (req, res, next) => {
    let token = req.header("Authorization");
    console.log(token);
    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }
    token = token.split(" ")[1];
    jwt.verify(token, jwtConfig.secretKey, (err, decoded) => {
      if (err) {
        console.log(err);
        return res.status(401).json({ message: "Invalid token" });
      }
      req.user = decoded;
      next();
    });
  },

  // decodeJwtToken: async (token) => {
  //   const payload = await jwt.decode(token);
  //   return payload;
  // },
  // verifyJwt: () => async (request, response, next) => {
  //   const token = request.headers.authorization.split(" ")[1];
  //   const payload = await decodeJwtToken(token);
  //   console.log(JSON.stringify(payload));
  //   next();
  //   return null;
  // },

  // verifyJwtToken: (token) => {
  //   console.log("Verify: " + token);
  //   jwt.verify(token, jwtConfig.secretKey, (error, decoded) => {
  //     if (error) {
  //       return false;
  //     } else {
  //       return true;
  //     }
  //   });
  // },
};
