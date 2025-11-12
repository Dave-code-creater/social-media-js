const express = require("express")
const router = express.Router()
const auth = require("../../middleware/auth")

// @route:   GET api/profile
// @desc:    test route
// @access:  public
router.get("/", auth, (req, res) => {
    res.send("Profile route")
});

module.exports = router;