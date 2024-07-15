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
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

//create post route
router.post("/",authMiddleware, createPost);
//get post of user
router.get("/:userId", getUserPosts);
//get shared posts
router.get("/share/:userId", getSharedPosts);

//like, share, comment, delete post
router.put("/share",authMiddleware, sharePost);
router.put("/like",authMiddleware, likePost);
router.put("/unlike",authMiddleware, unlikePost);
router.put("/comment",authMiddleware, commentPost);
router.put("/comment/delete",authMiddleware, deleteComment);
router.put("/comment/like",authMiddleware, likeComment);
router.delete("/:postId",authMiddleware, deletePost);

module.exports = router;
