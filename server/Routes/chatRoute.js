const express = require('express');
const { createChat, getUserChats, findChat } = require('../Controllers/chatController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.post("/",authMiddleware, createChat);
router.get("/:userId",authMiddleware, getUserChats);
router.get("/find/:firstId/:secondId",authMiddleware, findChat);

module.exports = router;