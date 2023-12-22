
const express = require('express');
const router = express.Router();
const User = require('./../models/User');

const fetchuser = require('../middleware/fetchuser')

const { body, validationResult } = require('express-validator');

const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');



const jwt_secret = "abrakadabra";

// Function to send a password reset email (implement this separately)
const nodemailer = require('nodemailer');

const { google } = require('googleapis');
// const { OAuth2 } = require('google-auth-library');

const CLIENT_ID = '335294488149-p4s538112iodda6stmutj1mico6t3um8.apps.googleusercontent.com';
const CLIENT_SECRET = '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';
const REDIRECT_URI = 'https://developers.google.com/oauthplayground'
const REFRESH_TOKEN = '1//04hIFRy0bZqdkCgYIARAAGAQSNwF-L9IrWBwcfZ0f2XaUbW43lUV3mmsoD8soat7Uy67OlNC7Wv3myX7xqSkKni7-F2jHTJLKKUc'

const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI)





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

//  Route 4: Reset Password


// Add a new route to generate a password reset token
router.post('/resetpassword', async (req, res) => {
    const { email } = req.body;

    try {

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ success: false, error: 'User not found' });
        }

        // Generate a reset token and set an expiration time (e.g., 1 hour)
        const resetToken = jwt.sign({ userId: user.id }, jwt_secret, { expiresIn: '1h' });

        // Save the reset token and its expiration time in the user's document
        user.resetToken = resetToken;
        user.resetTokenExpiration = Date.now() + 3600000; // 1 hour
        await user.save();

        // Send an email with a link containing the reset token
        // (You'll need to implement this function separately)

        // console.log('User object:', user);

        sendPasswordResetEmail(user.email, resetToken);


        res.json({ success: true, message: 'Password reset email sent' });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
});


// Add a new route to handle the password reset
router.post('/resetpassword/:token', async (req, res) => {
    const { token } = req.params;
    const { newPassword } = req.body;

    try {

        const user = await User.findOne({ resetToken: token, resetTokenExpiration: { $gt: Date.now() } });


        if (!user) {
            return res.status(400).json({ success: false, error: 'Invalid or expired reset token' });
        }

        // Update the user's password and reset token fields
        const salt = bcrypt.genSaltSync(10);
        const encryptpass = bcrypt.hashSync(newPassword, salt);
        user.password = encryptpass;
        user.resetToken = undefined;
        user.resetTokenExpiration = undefined;
        await user.save();

        res.json({ success: true, message: 'Password reset successfully' });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
});



// Function to send a password reset email (implement this separately)
async function sendPasswordResetEmail(email, resetToken) {
    try {


        // Set the stored refresh token
        oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

        // Refresh the access token
        const accessTokenObject = await oAuth2Client.getAccessToken();
        const accessToken = accessTokenObject.token;

        // console.log("accessToken ", accessToken);

        // Set up Nodemailer transporter with OAuth2
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                type: 'OAuth2',
                user: 'luvthakur262001@gmail.com',
                clientId: CLIENT_ID,
                clientSecret: CLIENT_SECRET,
                refreshToken: REFRESH_TOKEN,
                accessToken: accessToken,
            },
        });

        // Email content
        const mailOptions = {
            from: 'luvthakur262001@gmail.com',
            to: email,
            subject: 'Password Reset',
            html: `
                <p>You have requested a password reset. Click the link below to reset your password:</p>
                <a href="http://localhost:3000/resetpassword/${resetToken}">Reset Password</a>
            `,
        };

        // Send the email
        const info = await transporter.sendMail(mailOptions);

        console.log('Email sent:', info.response);
    } catch (error) {
        console.error('Error sending email:', error.message);
        // Handle email sending errors (log, retry, etc.)
    }
}

module.exports = { sendPasswordResetEmail };


module.exports = router;
