const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

const auth = (req, res, next) => {
    try {
        console.log(req);
        const jwtCookie = req.cookies.jwt;

        if (!jwtCookie) {
            throw new Error('Authentication required');
        }

        const verifyUser = jwt.verify(jwtCookie, process.env.SECRET_KEY);

        next();
    } catch (error) {
        return res.status(401).json({ error: 'Authentication required' });
    }
};

module.exports = auth;