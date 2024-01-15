const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET;

module.exports.authenticate = (req, res, next) => {
    jwt.verify(req.cookies.userToken, secret, (err, payload) => {
        if (err) { 
            res.status(401).json({verified: false, msg: "You must be signed in to access this function. Please create an account or sign in."});
        } else {
            next();
        }
        });
    }