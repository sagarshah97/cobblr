const jwt = require("jsonwebtoken");
const { jwtConfig } = require("../config");

module.exports = {
  generateJwtWebToken: (userId, role) => {
    const expiresIn = jwtConfig.timeout;
    const token = jwt.sign(
      {
        id: userId,
        role: role,
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

  verifyToken: (req, res, next) => {
    let token = req.header("Authorization");
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
};
