const router = require("express").Router();
const auth = require("../middleware/auth");

const {
    userRegis,
    userLogin,
    logout
} = require("../controller/auth.controller");

router.post("/user/register", userRegis);
router.post("/user/login", userLogin);
router.get("/user/logout",auth,logout);

module.exports = router;