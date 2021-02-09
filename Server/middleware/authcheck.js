const jwt = require("jsonwebtoken");
const keys = require("../keys");

module.exports = function (req, res, next) {
    
    // Get token from header
    const token = req.header("token");
    // Check if not token
    if (!token) {
        return res.status(404).json({ msg: "No token, authorization denied" });
    }

    // Verify token

    jwt.verify(token, keys["jwtSecret"], (error, decoded) => {
        if (error) {
            return res.status(404).json({ msg: "Token is not valid" });
        } else {
            req.user = decoded.user;
            next();
        }
    });
};
