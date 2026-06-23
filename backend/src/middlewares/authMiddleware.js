const jwt = require("jsonwebtoken");

function authMiddleware(req, res, next) {

    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({
            message: "Token nije prosledjen."
        });
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        req.korisnik = decoded;

        next();

    } catch (err) {
        return res.status(401).json({
            message: "Nevazeci token."
        });
    }
}

module.exports = authMiddleware;