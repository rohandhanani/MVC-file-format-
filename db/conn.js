const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/student")
.then(() => {
    console.log(`Database Connected`);
})
.catch((err) => {
    console.log(`Database Not Connected`);
})