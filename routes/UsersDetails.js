// usersController.js
const express = require("express");
const router = express.Router();
const User = require("../schema/UserDetail");

// Fetch user details by userId
router.get("/:username", async (req, res) => {
  try {
    const { username } = req.params;
    // const userIdToFind = "3"; // Assuming you have the _id value as a string
    const user = await User.findOne({username});  
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    console.log(user);

    return res.json(user);
  } catch (error) {
    // return res.status(500).json({ message: 'Server error' });
    return res.send(error);
  }
});


router.post("/new", async (req, res) => {
  try {
    // const { userId } = req.params;
    // const user = await User.create({ _id: userId, ...req.body });
    const user = await User.create({ ...req.body });
    return res.json(user);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error });
  }
});

router.post("/:username", async (req, res) => {
  try {
    const { username } = req.params;
    // console.log("req body",req.body);
    const existingUser = await User.findOne({ username });

    if (existingUser) {
      // User exists, update related data
      const updatedUser = await User.findOneAndUpdate({ username }, req.body, {
        new: true,
      });
      console.log("updated user",updatedUser)
      return res.json(updatedUser);
    } else {
      console.log("creating new user....");
      // User doesn't exist, create a new user
      const newUser = await User.create({ ...req.body, username });
      return res.json(newUser);
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error });
  }
});


module.exports = router;
