const mongoose = require('mongoose');

const { Schema, ObjectId } = mongoose;

const ProfileSchema = new Schema({
  user: { type: Schema.Types.ObjectId, unique: true },
  avatar: { type: String },
  background: { type: String },
  experience: [{
     company: { type: String },
     from: { type: Timestamp },
     position: { type: String },
     to: { type: Timestamp },
     _id: false,
  }],
  friends: [{
     time: { type: Timestamp },
     userId: { type: Schema.Types.ObjectId },
     _id: false,
  }],
  friend_request: [{
     time: { type: Timestamp },
     userId: { type: Schema.Types.ObjectId },
     _id: false,
  }],
  education: [{
     from: { type: Timestamp },
     school: { type: String },
     to: { type: Timestamp },
     _id: false,
  }],
}, {
    timestamps: true,
});

const Profile = mongoose.model('Profile', ProfileSchema);

module.exports = Profile;

