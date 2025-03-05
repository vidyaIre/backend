const authMiddleware = (req, res, next) => {
    if (req.query) {
        if (req.query.token === 'validToken') {
            next();
        } else {
            //throw new Error("Invalid token, not authorised");
            res.status(200).json({
                success: false,
                statusCode: 200,
                message: "Invalid token"
            })
        }
    }else{
        res.status(200).json({
            success: false,
            statusCode: 200,
            message: "Invalid request"
        })
    }
}
module.exports =authMiddleware;