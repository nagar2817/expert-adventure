// import './db';
const express = require("express");
const app = express();
const pool = require('./db.js');
const dotenv = require('dotenv');
dotenv.config();
app.use(express.json());

const PORT = process.env.PORT || 5000;


const UserInfoRouter = require('./routes/UserInfo.js');
const UsersDetails = require('./routes/UsersDetails.js');

app.use('/usersinfo',UserInfoRouter);
app.use('/users',UsersDetails);

app.get('/this',(req,res)=>{
  res.send("hello");
})

process.on('uncaughtException', function (err) {
    console.log(err);
  });

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});