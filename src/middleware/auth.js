const jwt = require("jsonwebtoken")
const config = require("config")

module.exports = function(req, res, next) {
    // Get token from a header of request
    const token = req.header("x-auth-token")
    if (!token) {
        return res.status(401).json({ msg: "No token, authorization denied"});
    }
    try {
    // Check the validations of that token
        const decode = jwt.verify(token, config.get("jwtSecret"));

        req.user = decode.user;
        next();
    // if failed return 401 else process
    } catch(err){
        res.status(401).json({ msg: "No token, authorization denied"})
    }
}