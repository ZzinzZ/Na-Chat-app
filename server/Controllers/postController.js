const postModel = require("../Models/postModel");

// Create a new post
const createPost = async (req, res) => {
  try {
    const { userId, content, like, share, comments } = req.body;

    const post = new postModel({
      userId,
      content,
      like,
      share,
      comments,
    });
    const response = await post.save();
    res.status(201).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json("Server error!");
  }
};

// Get all posts from the user
const getUserPosts = async (req, res) => {
  try {
    const { userId } = req.params;
    const posts = await postModel.find({ userId });
    res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json("Server error!");
  }
};
//Share posts

const sharePost = async (req, res) => {
  try {
    const { postId, userId } = req.body;
    // Find post by postId
    const post = await postModel.findById(postId);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Check user shared post
    const alreadyShared = post?.share.some(
      (share) => share.userId.toString() === userId
    );

    if (alreadyShared) {
      return res
        .status(400)
        .json({ message: "This user has already shared this post" });
    }

    // Share post
    post.share.push({ userId, time: new Date() });
    await post.save();

    res.status(200).json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};
//Get shared posts

const getSharedPosts = async (req, res) => {
  try {
    const { userId } = req.params;
    const posts = await postModel.find({
      share: { $elemMatch: { userId: userId } },
    });
    res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json("Server error!");
  }
};

// Like post

const likePost = async (req, res) => {
  try {
    const { postId, userId } = req.body;
    // Find post by postId
    const post = await postModel.findById(postId);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Check user liked post
    const alreadyLiked = post.like.some(
      (like) => like.userId.toString() === userId
    );

    if (alreadyLiked) {
      return res
        .status(400)
        .json({ message: "This user has already liked this post" });
    }

    // Like post
    post.like.push({ userId });
    await post.save();

    res.status(200).json({ message: "The post is liked", post });
  } catch (err) {
    res.status(500).json({ message: "Error: ", error: err.message });
  }
};

//Unlike post

const unlikePost = async (req, res) => {
  try {
    const { postId, userId } = req.body;
    // Find post by postId
    const post = await postModel.findById(postId);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Check user liked post
    const index = post.like.findIndex(
      (like) => like.userId.toString() === userId
    );

    if (index === -1) {
      return res
        .status(400)
        .json({ message: "This user has not liked this post" });
    }

    // Unlike post
    post.like.splice(index, 1);
    await post.save();

    res.status(200).json({ message: "The post is unlike", post });
  } catch (err) {
    res.status(500).json({ message: "Error: ", error: err.message });
  }
};

const commentPost = async (req, res) => {
  try {
    const { postId,userId,text } = req.body;
    // Find post by postId
    const post = await postModel.findById(postId);
    if(!post) return res.status(404).json({ message: "Post not found"});

    // Add comment to the post
    post.comments.push({ userId,text,like:[], time: new Date() });
    await post.save();
    res.status(200).json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json("Server error!");
  }
};

const deleteComment = async (req, res) => {
    try {
      const { postId, commentId, userId } = req.body;
      // Find post by postId
      const post = await postModel.findById(postId);
      if(!post) return res.status(404).json({ message: "Post not found"});

      //remove comment from post
      const commentIndex = post.comments.findIndex(
        (comment) => comment._id.toString() === commentId && comment.userId.toString() === userId
      );
      if (commentIndex === -1) {
        return res
         .status(400)
         .json({ message: "This user has not commented on this post" });
      }
      post.comments.splice(commentIndex, 1);
      await post.save();
      res.status(200).json(post);

    }
    catch(error){
        console.error(error);
    res.status(500).json("Server error!");
    }
};
const likeComment = async (req, res) => {
    try {
      const { postId, commentId, userId } = req.body;
  
      // Tìm bài viết theo postId
      const post = await postModel.findById(postId);
      if (!post) return res.status(404).json({ message: "Post not found" });
  
      // Tìm comment theo commentId
      const comment = post.comments.id(commentId);
      if (!comment) return res.status(404).json({ message: "Comment not found" });
  
      // Kiểm tra nếu người dùng đã thích comment
      const alreadyLiked = comment.like.some((like) => like.userId.toString() === userId);
  
      if (alreadyLiked) {
        // Nếu đã thích, bỏ thích
        comment.like = comment.like.filter((like) => like.userId.toString() !== userId);
      } else {
        // Nếu chưa thích, thêm like
        comment.like.push({ userId });
      }
  
      // Lưu lại bài viết
      await post.save();
  
      res.status(200).json(post);
    } catch (error) {
      console.error(error);
      res.status(500).json("Server error!");
    }
  };
  
  module.exports = { likeComment };
  
//delete post

const deletePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const post = await postModel.findByIdAndDelete(postId);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.status(200).json({ message: "Post deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error: ", error: err.message });
  }
};

module.exports = {
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
};
