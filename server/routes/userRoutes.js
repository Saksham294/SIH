const { registerUser,
    loginUser,
    logoutUser,
    getMyProfile,
   } = require("../controllers/userController")
const express = require("express")
const router = express.Router();
const isAuthenticated = require("../middleware/auth")


router.route('/register').post(registerUser)
router.route('/login').post(loginUser)
router.route("/me").get(isAuthenticated, getMyProfile)
router.route('/logout').get(logoutUser)

module.exports = router