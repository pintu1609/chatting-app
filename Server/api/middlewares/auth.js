const jwt = require("jsonwebtoken");
const { responseHandler } = require("../middlewares/response-handler.js")
require("config")


exports.verifyAccessToken = async (req, res, next) => {
    try {

        var token = req.headers.authorization;
        //if no token found, return response (without going to the next middelware)
        if (!token) {
            return responseHandler(null, res, 'Unauthorized!', 401);
        }

        if (token.includes("Bearer")) {
            token = token.substr(7);
        }

        const decoded = jwt.verify( token, process.env.ACCESS_TOKEN_PRIVATE_KEY);

        req.user = decoded;
        next();

    } catch (err) {
        console.log("error is ", err);
        return responseHandler(null, res, "Access Denied: Invalid token", 500);
    }
}