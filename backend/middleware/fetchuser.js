const jwt = require('jsonwebtoken');
const jwt_secret = "abrakadabra";

const fetchuser = (req, res, next) => {
    // Get user from JWT token and add id to req object

    const token = req.header('auth-token');

    if (!token) {
        return res.status(401).send({ error: "Unauthorized Token" });
    }

    try {
        // After getting the token, verify it
        const data = jwt.verify(token, jwt_secret);
        req.user = data.user;
        next();
    } catch (error) {
        res.status(401).send({ error: error.message });
    }
};

module.exports = fetchuser;
