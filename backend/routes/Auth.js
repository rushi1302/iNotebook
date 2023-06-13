const express = require('express');
const User = require('../schema/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const fetchUser = require('../middleware/fetchUser')

//Route-1 Create a user using : post "/api/auth/createuser". No login required.

const JWT_SECRET = 'Rushi is a good b$oy'

router.post('/createuser', [
    body('name', 'Enter a valid name').isLength({ min: 5 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'password must be atleast 5 characters').isLength({ min: 5 }),
], async (req, res) => {
    // if there are errors return bad errors and return errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    //check weather the user with same email exiist already
    try {
        let user = await User.findOne({ email: req.body.email })
        if (user) {
            return res.status(400).json({ error: "Sorry the user with this mail is already exist" })
        }

        // hashing password using bcrypt
        // generating salt
        const salt = await bcrypt.genSalt(10)
        //generating hash
        const secPass = await bcrypt.hash(req.body.password, salt)
        //create a user
        user = await User.create({
            name: req.body.name,
            password: secPass,
            email: req.body.email
        })

        // jwt authentication
        const data = {
            user: {
                id: user.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET)
        console.log(authToken);
        // res.json({ user });
        res.json({ authToken })
    }
    // catching error
    catch (error) {
        console.log(error.message);
        res.status(500).send("some error occured")
    }

})
//Route -2  Authentication a user using : post "/api/auth/login". No login required.

router.post('/login', [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password cannot be blank').exists(),
], async (req, res) => {

    // If there are errors, return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: "Please try to login with correct credentials" });
        }

        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            return res.status(400).json({ error: "Please try to login with correct credentials" });
        }

        const data = {
            user: {
                id: user.id
            }
        }
        const authtoken = jwt.sign(data, JWT_SECRET);
        res.json({ authtoken })

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }


})

// Route 3 Get logged in user details using POST "/api/auth/getuser". Login required

router.post('/getuser', fetchUser, async (req, res) => {
    try {
        userID = req.user.id;
        const user = await User.findById(userID).select("-password")
        res.send(user)
    } catch (error) {
        console.log(error.message);
        res.status(500).send("some error occured")
    }
})


module.exports = router;  