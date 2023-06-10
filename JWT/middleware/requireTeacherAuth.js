const jwt = require("jsonwebtoken");
const Teacher = require("../models/Teacher");

module.exports = (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).send({ error: "You must be logged In" });
    }

    const token = authorization.replace("Bearer ", "");
    jwt.verify(token, "I4049TI7EP", async (err, payload) => {
        if (err) {
            return res.status(401).send({ error: "You must be logged In" });
        }
        const { teacherid } = payload;
        const teacher = await Teacher.findById(teacherid);
        req.teacher = teacher;
        next();
    });
};
