const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
    chatId: String,
    senderId: String,
    content: String
},{
    timestamps: true
})

const messageModel = mongoose.model('Message', MessageSchema);

module.exports = messageModel;