const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    try {
        const token = req.header('authorization').replace('Bearer ', '');
        //console.log("token is:", token);

        const decryptedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
        //console.log(decryptedToken);
        //console.log(decryptedToken.userId);

        if (decryptedToken && decryptedToken?.userId) {
            req.userId = decryptedToken.userId;
            next();
        } else {
            res.status(200).json({
                success: false,
                statusCode: 200,
                message: "invalid token"
            })
        }
    } catch (error) {
        //console.log("error is:", error);
        res.status(200).json({
            success: false,
            statusCode: 200,
            message: "Not authenticated"
        })
    }
}
module.exports = authMiddleware;