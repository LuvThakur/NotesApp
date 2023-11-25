
const express = require('express');
const router = express.Router();
const User = require('./../models/User');

const fetchuser = require('../middleware/fetchuser')

const { body, validationResult } = require('express-validator');

const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');



const jwt_secret = "abrakadabra";


// validator is enclosed inside the array

//Route 1: create an user using POST : "/api/auth/createuser"
router.post('/createuser', [
    body('name', 'Enter an Valid Name').isLength({ min: 3 }),
    body('email', 'Enter an Valid Email').isEmail(),
    body('password', 'min pas length 5').isLength({ min: 5 }),
], async (req, res) => {

    //   check the errors 
    const result = validationResult(req);
    let success = false;


    if (!result.isEmpty()) {
        return res.status(400).json({ success, errors: result.array() });
    }

    //  check whether user exit or not

    try {
        // Check if a user with the provided email already exists
        const existingUser = await User.findOne({ email: { $regex: new RegExp(req.body.email, 'i') } });

        if (existingUser) {
            return res.status(400).json({ success, error: "User already exists" });
        }


        const salt = bcrypt.genSaltSync(10)
        const encryptpass = bcrypt.hashSync(req.body.password, salt)

        // Create a new user
        const newUser = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: encryptpass
        });


        const data = {
            newUser:
            {
                id: newUser.id
            }
        }
        const authtoken = jwt.sign(data, jwt_secret);
        success = true;
        res.json({ success, authtoken });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: error.message });
    }
});

//Route 2: authentication  POST: "/api/auth/login"

router.post('/login',
    [
        body('email', 'Enter an Valid Email').isEmail(),
        body('password', 'Password is required').exists()
    ],
    async (req, res) => {

        let success = false;

        const result = validationResult(req);
        if (!result.isEmpty()) {
            return res.status(400).json({ success, errors: result.array() });
        }
        // destructuring for get email and password from body
        const { email, password } = req.body;

        try {

            let user = await User.findOne({ email: req.body.email });

            if (!user) {
                return res.status(404).json({ success, error: "EMAIL not found" });
            }

            const verifypassword = await bcrypt.compare(password, user.password)

            if (!verifypassword) {
                return res.status(401).json({ success, error: "Invalid password" });
            }

            const data = {
                user: {
                    id: user.id
                }
            }

            const authtoken = jwt.sign(data, jwt_secret)
            success = true;
            res.json({ success, authtoken })
        }
        catch (error) {
            console.error(error.message);
            res.status(500).json("Internal Server Error");
        }
    }
);

// Route  3: authentication POST : "/api/auth/getuser"

router.post('/getuser', fetchuser,
    async (req, res) => {
        try {
            userid = req.user.id;
            const user = await User.findById(userid).select("-password");
            res.json(user);
        }
        catch (error) {

            console.log(error.message);
            res.status(500).json("Internal Server Error");
        }
    });


module.exports = router;  