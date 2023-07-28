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
    // const databaseName = mongoose.connection.name;
    // const collectionName = User.collection.name;

    // console.log("Database:", databaseName);
    // console.log("Collection:", collectionName);
    console.log(user);

    return res.json(user);
  } catch (error) {
    // return res.status(500).json({ message: 'Server error' });
    return res.send(error);
  }
});

// Update user details by userId
// router.put("/:userId", async (req, res) => {
//   try {
//     const { userId } = req.params;
//     const updatedUser = await User.findByIdAndUpdate(userId, req.body, {
//       new: true,
//     });
//     if (!updatedUser) {
//       return res.status(404).json({ message: "User not found" });
//     }
//     return res.json(updatedUser);
//   } catch (error) {
//     return res.status(500).json({ message: "Server error" });
//   }
// });

// Create a new user document with userId
// router.post("/:userId", async (req, res) => {
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
      // User doesn't exist, create a new user
      const newUser = await User.create({ ...req.body, username });
      return res.json(newUser);
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error });
  }
});


router.post('/:email/projects/:projectName', async (req, res) => {
  try {
    const { email, projectName } = req.params;
    const updatedProjectData = req.body;

    // Find the user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Find the index of the project with the specified name within the projects array
    const projectIndex = user.projects.findIndex((project) => project.name === projectName);

    if (projectIndex === -1) {
      return res.status(404).json({ message: 'Project not found' });
    }

    // Update the project data within the projects array
    user.projects[projectIndex] = { ...user.projects[projectIndex], ...updatedProjectData };

    // Save the updated user data
    await user.save();

    return res.json(user);
  } catch (error) {
    console.error('Error updating project data:', error);
    return res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
