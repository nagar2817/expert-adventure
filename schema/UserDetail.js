// models/User.js
const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  name: { type: String },
  startDate: { type: String },
  endDate: { type: String },
  githubLink: { type: String },
  description: [{ type: String }],
});

const experienceSchema = new mongoose.Schema({
  companyName: { type: String },
  position: { type: String },
  startDate: { type: String },
  endDate: { type: String },
  location: { type: String },
  domain: [{ type: String }],
  bullets: [{ type: String }],
});

const educationSchema = new mongoose.Schema({
  degree: { type: String },
  institution: { type: String },
  location: { type: String },
  graduationYear: { type: String },
  gpa: { type: String },
});



// const achievementSchema = new mongoose.Schema({
//   title: { type: String },
// });

const skillsSetSchema = new mongoose.Schema({
  languages: { type: String },
  databases: { type: String },
  libraries: { type: String },
  frameworks: { type: String },
  tools: { type: String },
});

const userSchema = new mongoose.Schema({
  //   _id: { type: mongoose.Types.ObjectId, auto: true },
  name: { type: String },
  email: { type: String }, 
  username:{type:String},
  aboutMe: { type: String },
  skillsData: [skillsSetSchema],
  projects: [projectSchema],
  experience: [experienceSchema],
  education: [educationSchema],
  coursework: [{ type: String }],
  achievements: [{type:String}]
});

const User = mongoose.model("User", userSchema);

module.exports = User;
