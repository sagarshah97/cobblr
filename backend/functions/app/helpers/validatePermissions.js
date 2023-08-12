const { UserRoleRankMap } = require("../constants");
const responseGenerator = require("./responseGenerator");
const { decodeJwtToken } = require("./jwt");

module.exports = {
  validateUserPermission: () => async (request, response, next) => {
    const token = request.headers.authorization.split(" ")[1];

    const payload = await decodeJwtToken(token);
    if (payload) {
      next();
    } else {
      return response.status(403).send("PERMISSION_DENIED");
    }
  },
};
