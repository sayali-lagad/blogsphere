const Comment = require('../models/Comment');

const createComment = async (req, res) => {
  try {
    const { postId, author, text } = req.body;

    const newComment = new Comment({
      postId,
      author,
      text
    });

    await newComment.save();

    res.status(201).json({
      message: 'Comment added successfully'
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

const getCommentsByPost = async (req, res) => {
  try {
    const comments = await Comment.find({
      postId: req.params.postId
    });

    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

module.exports = {
  createComment,
  getCommentsByPost
};