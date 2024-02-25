const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        const verifyUser = jwt.verify(token, process.env.SECRET_KEY);
        next();
    } catch (error) {
        return res.status(401).json("authentication required")
    }
}
module.exports = auth;