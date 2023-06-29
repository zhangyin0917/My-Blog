var express = require("express");
var router = express.Router();

// 引入express验证
const expressjoi = require("@escook/express-joi");
// 把对象结构出来
const { reg_login_schema } = require("../schema/user");

const user_handler = require("../dao/index");

router.post("/reguser", expressjoi(reg_login_schema), user_handler.reqUser);
router.post("/login", expressjoi(reg_login_schema), user_handler.login);
router.get("/captcha", user_handler.getCaptcha);
router.get("/getInfo", user_handler.getInfo);
module.exports = router;
