const express = require("express");
const cookieparser = require("cookie-parser");
const app = express();
require("dotenv").config();
require("./db/conn");

const PORT = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieparser());

const authRouter = require("./routes/auth.route");

app.use("/auth", authRouter);

app.listen(PORT, () => {
    console.log(`Server Running At PORT : ${PORT}`);
})