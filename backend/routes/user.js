const express = require('express');
const router = express.Router();
const User = require('../model/user.model');

// GET all users
router.get('/getusers', async (req, res) => {
    try {
      const users = await User.find();
      res.json(users);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  
  // POST a new user
  router.post('/add', async (req, res) => {
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    });
    try {
      const newUser = await user.save();
      res.status(201).json(newUser);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });
  
  // GET a user by id
  router.get('/getusers/id', getUser, (req, res) => {
    res.json(res.user);
  });
  
  // UPDATE a user
  router.put('/update/:id', getUser, async (req, res) => {
    if (req.body.name != null) {
      res.user.name = req.body.name;
    }
    if (req.body.email != null) {
      res.user.email = req.body.email;
    }
    if (req.body.password != null) {
      res.user.password = req.body.password;
    }
    try {
      const updatedUser = await res.user.save();
      res.json(updatedUser);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });
  
  // DELETE a user
  router.delete('/delete/:id', getUser, async (req, res) => {
    try {
      const deletedUser = await res.user.deleteOne({ _id: req.params.id });
      if (deletedUser.deletedCount === 0) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json({ message: 'User deleted' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  
  async function getUser(req, res, next) {
    try {
      user = await User.findById(req.params.id);
      if (user == null) {
        return res.status(404).json({ message: 'Cannot find user' });
      }
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
    res.user = user;
    next();
  }

module.exports = router;
