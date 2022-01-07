const jwt = require('jsonwebtoken');
const chapter = require("../models/auth.model")
const authSchema = async (req,res,next) => {
    try {
        
        const token = req.cookies.jwt;
        console.log(token);
        const verifyUser = jwt.verify(token, process.env.SECRET_KEY);
        const user = await chapter.findOne({ _id:verifyUser._id});

        req.token = token;
        req.user = user;
        next();

    } catch (error) {
        res.status(401).send('Not Match Data');
    }
};

module.exports = authSchema;