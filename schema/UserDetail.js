// models/User.js
const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  startDate: { type: String, required: true },
  endDate: { type: String, required: true },
  githubLink: { type: String, required: true },
  description: [{ type: String, required: true }],
});

const experienceSchema = new mongoose.Schema({
  companyName: { type: String, required: true },
  position: { type: String, required: true },
  startDate: { type: String, required: true },
  endDate: { type: String, required: true },
  location: { type: String, required: true },
  domain: [{ type: String }],
  bullets: [{ type: String, required: true }],
});

const educationSchema = new mongoose.Schema({
  degree: { type: String, required: true },
  institution: { type: String, required: true },
  location: { type: String, required: true },
  graduationYear: { type: String, required: true },
  gpa: { type: String },
});

const courseworkSchema = new mongoose.Schema({
  title: { type: String, required: true },
});

const achievementSchema = new mongoose.Schema({
  title: { type: String, required: true },
});

const skillsSetSchema = new mongoose.Schema({
  languages: { type: String, required: true },
  databases: { type: String, required: true },
  libraries: { type: String, required: true },
  frameworks: { type: String, required: true },
  tools: { type: String, required: true },
});

const userSchema = new mongoose.Schema({
    _id: { type: mongoose.Types.ObjectId, auto: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  aboutMe: { type: String, required: true },
  skillsSet: skillsSetSchema,
  projects: [projectSchema],
  experience: [experienceSchema],
  education: [educationSchema],
  coursework: [courseworkSchema],
  achievements: [achievementSchema],
});

const User = mongoose.model('User', userSchema);

module.exports = User;
