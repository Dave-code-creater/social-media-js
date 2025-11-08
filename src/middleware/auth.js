const jwt = require("jsonwebtoken")
const config = require("config")

module.exports = function(req, res, next) {
    // Get token from a header of request
    const tokens = req.header("x-auth-token")
    if (!tokens) {
        return res.status(401).json({ msg: "No token, authorization denied"});
    }
    try {
    // Check the validations of that tokens
        const decode = jwt.verify(token, config.get("jwtSecret"));

        req.user = decode.user;
        next();
    // if failed return 401 else process
    } catch(err){
        res.status(401).json({ msg: "No token, authorization denied"})
    }
}