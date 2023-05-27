const jwt = require("jsonwebtoken");

const authGuard = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.json({ error: "Authorization header not found." }).status(404);
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
        return res.json({ error: "No header token found!" }).status(404);
    }

    try {
        const decodedUser = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decodedUser;
        console.log(req.user);
        next();
    } catch (error) {
        console.log(error);
        return res.json({ error: "Invalid token!" }).status(401);
    }
};

module.exports = authGuard;
