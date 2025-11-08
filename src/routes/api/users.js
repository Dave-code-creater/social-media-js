const express = require("express")
const router = express.Router()
const { check, validationResult } = require("express-validator")
const User = require("../../models/User")
const gravatar = require("gravatar")
// @route:   GET api/users
// @desc:    test route
// @access:  public
router.post("/", [
    check("name", 'Name is required').not().isEmpty(),
    check("email", 'Please include a valid email').isEmail(),
    check("password", "Please enter a password with 6 or more characters").isLength({min: 6})
], async (req,res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }
    
    const {name, email, password } = req.body

    try {
        let user = await User.findOne({email: email})

        if (user){
            res.status(400).json({error: [{msg: "User already exist"}]})
        }
        // See if user exists

        // Get users gravatar

        // Encrypt password

        // Return jsonwebtoken
    } catch(err) {
        console.error(err.messages);
        res.status(500).send("Server error")
    }
    


    res.send("User route");
})

module.exports = router;