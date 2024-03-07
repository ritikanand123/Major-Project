const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
    try {

        console.log(req.cookies);
        const { jwt: token } = req.cookies;

        const verifyUser = jwt.verify(jwt, process.env.SECRET_KEY);
        next();
    } catch (error) {
        return res.status(401).json("authentication required")
    }
}
module.exports = auth;