const mongoose = require("mongoose");

const { Schema, ObjectId } = mongoose;

const PostsSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId },
    content: {
      caption: { type: String, required: true },
      image_path: { type: String },
      _id: false,
    },
    like: [{ userId: { type: Schema.Types.ObjectId }, _id: false }],
    comments: [
      {
        userId: { type: Schema.Types.ObjectId },
        like: [{ userId: { type: Schema.Types.ObjectId } , _id: false}],
        text: { type: String, required: true },
        time: { type: Date },
      },
    ],
    share: [
      {
        time: { type: Date },
        userId: { type: Schema.Types.ObjectId },
        _id: false,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const PostModel = mongoose.model("Posts", PostsSchema);

module.exports = PostModel;
