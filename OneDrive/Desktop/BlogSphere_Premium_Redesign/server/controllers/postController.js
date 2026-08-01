const Post = require('../models/Post');

const createPost = async (req, res) => {
  try {
    const { title, content, author } = req.body;

    const newPost = new Post({
      title,
      content,
      author
    });

    await newPost.save();

    res.status(201).json({
      message: 'Post created successfully'
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().sort({
      createdAt: -1
    });

    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

const getSinglePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

const deletePost = async (req, res) => {
  try {
    await Post.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: 'Post deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

const updatePost = async (req, res) => {
  try {
    const { title, content, author } = req.body;

    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      {
        title,
        content,
        author
      },
      {
        new: true
      }
    );

    res.status(200).json({
      message: 'Post updated successfully',
      updatedPost
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

const likePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    post.likes += 1;

    await post.save();

    res.status(200).json({
      message: 'Post liked successfully'
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

const getStats = async (req, res) => {
  try {
    const posts = await Post.find();

    const totalPosts = posts.length;

    const totalLikes = posts.reduce(
      (sum, post) => sum + (post.likes || 0),
      0
    );

    res.status(200).json({
      totalPosts,
      totalLikes
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

module.exports = {
  createPost,
  getAllPosts,
  getSinglePost,
  updatePost,
  deletePost,
  likePost,
  getStats
};