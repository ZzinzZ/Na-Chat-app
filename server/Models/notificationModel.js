const mongoose = require('mongoose');

const { Schema, ObjectId } = mongoose;

const NotificationSchema = new Schema({
  senderId: { type: Schema.Types.ObjectId },
  isRead: { type: Boolean },
  type: { type: String },
  recipientId: { type: Schema.Types.ObjectId },
},{
    timestamps: true,
  
});

const Notification = mongoose.model('Notification', NotificationSchema);

module.exports = Notification;

