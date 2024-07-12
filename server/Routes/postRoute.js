const express = require("express");
const {
  createPost,
  getUserPosts,
  likePost,
  unlikePost,
  deletePost,
  getSharedPosts,
  sharePost,
  commentPost,
  deleteComment,
  likeComment,
} = require("../Controllers/postController");

const router = express.Router();

//create post route
router.post("/", createPost);
//get post of user
router.get("/:userId", getUserPosts);
//get shared posts
router.get("/share/:userId", getSharedPosts);

//like, share, comment, delete post
router.put("/share", sharePost);
router.put("/like", likePost);
router.put("/unlike", unlikePost);
router.put("/comment", commentPost);
router.put("/comment/delete", deleteComment);
router.put("/comment/like", likeComment);
router.delete("/:postId", deletePost);

module.exports = router;
