const messageModel = require("../Models/messageModel");

//create a new message
const createMessage = async(req, res) => {
    const {chatId, senderId, content} = req.body;

    const message = new messageModel({
        chatId,
        senderId,
        content
    });

    try {
        const response = await message.save();
        res.status(200).json(response);
    } catch (error) {
        console.log(error);
        res.status(500).json("Server error!");
    }
};

//get the message
const getMessage = async(req, res) => {
    const {chatId} = req.params;
    try {
        const message = await messageModel.find({chatId});
        res.status(200).json(message);
    } catch (error) {
        console.log(error);
        res.status(500).json("Server error!");
    }
};

module.exports = {createMessage, getMessage};