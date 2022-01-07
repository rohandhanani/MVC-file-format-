const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const authSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    number: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    tokens: [
        {
            token: {
                type: String,
                required: true,
            }
        }
    ]
}, {
    collection: "chapter"
});



authSchema.methods.generateauthtoken = async function () {
    try {
        const token = jwt.sign({ _id: this._id.toString() }, process.env.SECRET_KEY);
        this.tokens = this.tokens.concat({ token: token })
        await this.save();
        return token;
    } catch (error) {
        console.log(error);
    }
}

module.exports = mongoose.model("chapter", authSchema);