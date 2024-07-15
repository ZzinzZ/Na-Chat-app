const express = require('express');
const { createMessage, getMessage } = require('../Controllers/messageController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/',authMiddleware, createMessage);
router.get('/:chatId',authMiddleware, getMessage);

module.exports = router;