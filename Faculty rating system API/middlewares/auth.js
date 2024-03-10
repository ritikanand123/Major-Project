const jsonwebtoken = require('jsonwebtoken');
const Admin = require('../models/Admin');

const auth = (req, res, next) => {
    try {

        const { jwt } = req.cookies;
        // console.log(req);
        if (!jwt) {
            throw new Error('Authentication required');
        }

        const verifyUser = jsonwebtoken.verify(jwt, process.env.SECRET_KEY);
        const admin = Admin.findById({ _id: verifyUser });
        // console.log(admin);
        if (admin) {
            next();
        } else {
            return res.status(401).json({ message: "Authorization required" })
        }
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

module.exports = auth;