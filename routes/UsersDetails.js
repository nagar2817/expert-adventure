// usersController.js
const express = require('express');
const router = express.Router();
const User = require('../schema/UserDetail');

// Fetch user details by userId
router.get('/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    // const userIdToFind = "3"; // Assuming you have the _id value as a string

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const databaseName = mongoose.connection.name;
    const collectionName = User.collection.name;

    console.log('Database:', databaseName);
    console.log('Collection:', collectionName);

    return res.json(user);
  } catch (error) {
    // return res.status(500).json({ message: 'Server error' });
    return res.send(error);
  }
});

// Update user details by userId
router.put('/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const updatedUser = await User.findByIdAndUpdate(userId, req.body, { new: true });
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    return res.json(updatedUser);
  } catch (error) {
    return res.status(500).json({ message: 'Server error' });
  }
});

// Create a new user document with userId
router.post('/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.create({ _id: userId, ...req.body });
    return res.json(user);
  } catch (error) {
    return res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
