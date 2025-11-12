const express = require("express")
const router = express.Router()
const auth = require("../../middleware/auth")

// @route:   GET api/posts
// @desc:    test route
// @access:  public
router.get("/", auth, (req, res) => {
    res.send("Posts route")
});

module.exports = router;