const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/User');

const router = express.Router();

router.post('/', async (req, res) => {
  const { username, password } = req.body;

  try {
    const passwordHash = await bcrypt.hash(password, 10);
    const user = new User({ username, passwordHash });
    await user.save();
    res.status(201).send('User created');
  } catch (err) {
    res.status(500).json({ error: 'Error creating user', details: err });
  }
});

module.exports = router;
