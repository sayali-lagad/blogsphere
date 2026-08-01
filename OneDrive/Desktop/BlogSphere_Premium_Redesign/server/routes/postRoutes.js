const express = require('express');
const router = express.Router();

const {
  createPost,
  getAllPosts,
  getSinglePost,
  updatePost,
  deletePost,
  likePost,
  getStats
} = require('../controllers/postController');
router.get('/stats', getStats);

router.post('/', createPost);

router.get('/', getAllPosts);

router.get('/:id', getSinglePost);

router.put('/:id', updatePost);

router.delete('/:id', deletePost);

router.put('/like/:id', likePost);

module.exports = router;