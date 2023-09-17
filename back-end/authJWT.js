require("dotenv").config();
const SECRET = process.env.SECRET;
const jwt = require("jsonwebtoken");

function generateAccessToken(pseudo) {
    return jwt.sign({ pseudo: pseudo }, SECRET, { expiresIn: "1d" });
}

function authenticateToken(req, res, next) {
    const token = req.headers["authorization"];

    if (token == null) {
        res.sendStatus(401).json({ message: "token inexistant." });
    } else {
        jwt.verify(token, SECRET, (err, user) => {
            if (err) {
                res.status(403).json({ message: "authenticateToken : " + err.message });
            } else {
                req.user = user;
            }
        });
    }
    next();
}

module.exports = {
    generateAccessToken,
    authenticateToken,
};