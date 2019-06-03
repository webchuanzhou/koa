const router = require('koa-router')();
const controllerRegister = require('../controller/c-signup')
const controllerLogin = require('../controller/c-login')
const controllerUserInfo = require('../controller/c-userInfo')
router.post("/signup", controllerRegister.postSignup)
router.post("/login", controllerLogin.login)
router.post("/userInfo", controllerUserInfo.userInfo)
module.exports = router