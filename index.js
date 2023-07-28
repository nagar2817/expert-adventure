// import './db';
const express = require("express");
const app = express();
// const pool = require('./db.js');
const dotenv = require('dotenv');
const cors = require('cors');
const axios = require('axios');
const { download } = require("./utilities");

// const TwitterAPI = require('twitter-api-client');
// const {TwitterClient}  = require("twitter-api-client");


dotenv.config();
app.use(express.json());
app.use(cors(
  {
    origin : ['https://awesome-cv.onrender.com','http://localhost:3000']
  }
));
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

const PORT = process.env.PORT || 5000;

// const tweet = async () => {

//   const uri = "https://i.imgur.com/Zl2GLjnh.jpg";
//   const filename = "image.png"; 

//   download(uri, filename, async function(){
//       try {
//           const mediaId = await twitterClient.v1.uploadMedia("./image.png");
//           await twitterClient.v2.tweet({
//               text: "Hello world! This is an image in Ukraine!",
//               media: {
//                   media_ids: [mediaId]
//               }
//           });
//       } catch (e) {
//           console.log(e)
//       }
//   });
// }

const UserInfoRouter = require('./routes/UserInfo.js');
const UsersDetails = require('./routes/UsersDetails.js');
const TweetRouter = require('./temp.js');

app.use('/usersinfo',UserInfoRouter);
app.use('/users',UsersDetails); 
app.use('/',TweetRouter);

app.get('/this',(req,res)=>{
  res.send("hello");
})

// tweet();

process.on('uncaughtException', function (err) {
    console.log(err);
  });

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});