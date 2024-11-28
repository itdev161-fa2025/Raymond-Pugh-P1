const express = require('express');
const Post = require('../models/Post');

const router = express.Router();

router.post('/', async (req, res) => {
  const { userId, content } = req.body;

  try {
    const post = new Post({ userId, content });
    await post.save();
    res.status(201).send('Post created');
  } catch (err) {
    res.status(500).json({ error: 'Error creating post', details: err });
  }
});

router.get('/', async (req, res) => {
  try {
    const posts = await Post.find().sort({ timestamp: -1 });
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching posts', details: err });
  }
});

module.exports = router;
