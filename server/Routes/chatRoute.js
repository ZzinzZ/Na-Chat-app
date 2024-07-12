const express = require('express');
const { createChat, getUserChats, findChat } = require('../Controllers/chatController');

const router = express.Router();

router.post("/", createChat);
router.get("/:userId", getUserChats);
router.get("/find/:firstId/:secondId", findChat);

module.exports = router;