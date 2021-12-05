var express = require("express");
const authController = require("../../../controllers/ssac/authController");
const authModule = require("../../../modules/authModule");
var router = express.Router();

router.post("/signup", authController.signUp);
router.post("/signin", authController.signIn);

router.get("/profile", authModule.loggedIn, authController.getProfile);


module.exports = router;
