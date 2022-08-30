const jwt = require("jsonwebtoken");

exports.authenticated = (req, res , next) => {
    try {
        const authHeader = req.headers.authorization;
        if(!authHeader) {
            const error = new Error("You don't have permission");
            error.statusCode = 401;
            throw error;
        }
        const token = authHeader.split(' ')[1];       // Bearer Token => ['Bearer', token]
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        if (!decodedToken) {
            const error = new Error("You don't have permission");
            error.statusCode = 401;
            throw error;
        }
         req.personId = decodedToken.person.personId
         next()
    } catch (err) {
        next(err)
    }
}
