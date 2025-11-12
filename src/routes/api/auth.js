const express = require("express")
const router = express.Router()
const User = require("../../models/User")
const auth = require("../../middleware/auth")
const gravatar = require("gravatar")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const config = require("config")
const { check, validationResult } = require("express-validator")


// @route:   GET api/auth
// @desc:    Authenticate user & get token
// @access:  public

router.post("/login", [
    check("email", 'Please include a valid email').isEmail(),
    check("password", "Please enter a password with 6 or more characters").exists()
], async (req,res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }
    
    const {email, password } = req.body

    try {
        // See if user exists
        let user = await User.findOne({email: email})

        if (!user){
            res.status(400).json({error: [{msg: "Invalid credentials"}]})
        }


        const isValid = await bcrypt.compare(password, user.password)

        if (!isValid){
            res.status(400).json({error: [{msg: "Invalid credentials"}]})
        }

        // Return jsonwebtoken
        const payload = {
            user: {
                id: user.id

            }
        }

        jwt.sign(
            payload,
            config.get("jwtSecret"), 
            {expiresIn: 360000},
            (err, token) => {
                if (err) throw err;
                res.json({token});
            }
        );
    } catch(err) {
        console.error(err.messages);
        res.status(500).send("Server error")
    }
})

module.exports = router;