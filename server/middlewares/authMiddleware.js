const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    const token = req.header('x-auth-token');

    if(!token) {
        return res.status(401).json({msg: 'No token, authorization denied'});
    }

    try {
        const user = jwt.verify(
            token,
            process.env.JWT_SECRET_KEY
        );
        if(!req.user) {
            req.user = "";
            next();
        }
    } catch (error) {
        console.log(`[ERROR] Msg: ${token}`);
        if (error.name == 'TokenExpiredError') {
            res.status(401).json({ message: 'Token is expired' });
          } else {
            res.status(401).json({ message: 'Token is not valid' });
          }
    }
}

module.exports = authMiddleware;