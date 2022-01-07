const jwt = require("jsonwebtoken");
const chapter = require("../models/auth.model");

exports.userRegis = async (req, res) => {
    const userData = new chapter({
        username: req.body.username,
        number: req.body.number,
        password: req.body.password
    });

    try {
        const saveData = await userData.save();
        res.status(201).json({
            message: "User Registered",
            status: 201,
            data: saveData,
        })

    } catch (error) {
        res.status(400).json({
            message: error,
            status: 400
        })
    }
};

exports.userLogin = async (req, res) => {
    try {
        const number = req.body.number;
        const otp = req.body.otp;
        const otp2 = 999999;

        if (otp == otp2) {
            const data = await chapter.findOne({ number: number });
            const token = await data.generateauthtoken();
            console.log(token);
            res.cookie("jwt", token, {
                expires: new Date(Date.now() + 30 * 24 * 3600 * 10000),
                httpOnly: true,
            });
            res.status(201).json({
                message: "Login Succesfull",
                status: 201,
                id: data._id
            })
        } else {
            res.status(400).json({
                message: "OTP is invalid",
                status: 400,
            })
        }

    } catch (error) {
        res.status(400).json({
            message: error,
            status: 400
        })
    }
};

exports.logout = async (req, res) => {

    try {
        req.user.tokens = req.user.tokens.filter((curelement) => {
            return curelement.token !== req.token;
        });
        res.clearCookie("jwt");
        await req.user.save();
        res.status(201).json({
            message: "Logout Successfully",
            status: 201,
        });
    } catch (error) {
        res.status(201).json({
            message: "Please Try Again..",
            status: 401,
        });
    }
  

}
