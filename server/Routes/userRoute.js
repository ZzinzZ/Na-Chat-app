const express = require('express');
const {registerUser,loginUser, findUser, findAllUsers} = require("../Controllers/userController");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/", findAllUsers);
router.get("/find/:userId", findUser);

module.exports = router;