const express = require("express");
const { addUser, userSignin } = require("../controllers/usersController");

const router = express.Router();

router.route("/signup").post(addUser);
router.route("/signin").post(userSignin);

module.exports = router;
