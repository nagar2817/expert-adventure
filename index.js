const express = require("express");
const app = express();
const dotenv = require('dotenv');
const cors = require('cors');
const axios = require('axios');
const bodyParser = require('body-parser');
const { download } = require("./utilities");

const { TwitterApi } = require('twitter-api-v2');


dotenv.config();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
})

const PORT = process.env.PORT || 5000;

const UserInfoRouter = require('./routes/UserInfo.js');
const UsersDetails = require('./routes/UsersDetails.js');
const TweetRouter = require('./temp.js');

app.use('/usersinfo',UserInfoRouter);
app.use('/users',UsersDetails); 
app.use('/',TweetRouter); 

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