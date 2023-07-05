const jwt = require("jsonwebtoken");

const authorize = (req, res, next) => {
    const token = req.cookies.access_token;
    if (!token) return res.sendStatus(401);

    try {
        const decoded = jwt.verify(token, process.env.JWT_AUTH_SECRET);
        req.idUser = decoded.id;
        req.adminUser = decoded.admin;
        req.jobUser = decoded.job_id;
        req.roleUser = decoded.role_id;
        next();
    } catch (error) {
        res.sendStatus(401);
    }
}

const isAdmin = (req, res, next) => {
    if (req.adminUser == "1")
        next();
    else
        res.sendStatus(403);
}

module.exports = {authorize, isAdmin};