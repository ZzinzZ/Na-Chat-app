const profileModel = require("../Models/profileModel");

//create a new profile
const createProfile = async (req, res ) => {
    try {
        const {userId, avatar, background,experience,education} = req.body;
        const profile = new profileModel({
            user: userId,
            avatar,
            background,
            experience,
            education,
            friends: [],
            friend_request: [],
        })
        await profile.save();
        res.status(201).json(profile);
    }
    catch (error) {
        console.log(error);
        res.status(500).json("Server error!");
    }
};

module.exports = {createProfile};