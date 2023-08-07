const { UserRoleRankMap } = require("../constants");
const responseGenerator = require("./responseGenerator");
const { decodeJwtToken } = require("./jwt");

// module.exports = {
//   validateUserPermission: () => async (request, response, next) => {
//     const token = request.headers.authorization.split(" ")[1];
//     const payload = await decodeJwtToken(token);
//     if (UserRoleRankMap[payload.role] >= UserRoleRankMap[requiredRole]) {
//       next();
//       return null;
//     }
//     return response
//       .status(403)
//       .send(
//         responseGenerator.getErrorResponse(new Error("PERMISSION_DENIED")).body
//       );
//   },
// };

module.exports = {
  validateUserPermission: () => async (request, response, next) => {
    const token = request.headers.authorization.split(" ")[1];
    // Perform any additional logic specific to validating the JWT token

    // Example validation logic without user role comparison
    const payload = await decodeJwtToken(token);
    if (payload) {
      next();
    } else {
      return response.status(403).send("PERMISSION_DENIED");
    }
  },
};
