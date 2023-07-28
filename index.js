// import './db';
const express = require("express");
const app = express();
// const pool = require('./db.js');
const dotenv = require('dotenv');
const cors = require('cors');
const axios = require('axios');
// const TwitterAPI = require('twitter-api-client');
// const {TwitterClient}  = require("twitter-api-client");


dotenv.config();
app.use(express.json());
app.use(cors(
  {
    origin : ['https://awesome-cv.onrender.com']
  }
));
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

const PORT = process.env.PORT || 5000;


const UserInfoRouter = require('./routes/UserInfo.js');
const UsersDetails = require('./routes/UsersDetails.js');

app.use('/usersinfo',UserInfoRouter);
app.use('/users',UsersDetails); 

app.get('/this',(req,res)=>{
  res.send("hello");
})

// Replace these with your Twitter API credentials
const consumerKey = process.env.API_KEY;
const consumerSecret = process.env.API_SECRET_KEY;








process.on('uncaughtException', function (err) {
    console.log(err);
  });

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});