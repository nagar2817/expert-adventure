const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer();
module.exports = router;
const axios = require('axios');
const { download } = require("./utilities");

// Import twitter-api-v2
const { TwitterApi } = require("twitter-api-v2");

// Fill your API credentials
const client = new TwitterApi({
  appKey: process.env.TWITTER_CONSUMER_API_KEY,
  appSecret: process.env.TWITTER_CONSUMER_API_SECRET,
  accessToken: process.env.TWITTER_ACCESS_TOKEN,
  accessSecret: process.env.TWITTER_ACCESS_SECRET,
  bearerToken: process.env.TWITTER_BEARER_TOKEN,
});

// Provide read write controls
const rwClient = client.readWrite;


const tweet = async (url) => {

    const uri = url;
    // url = https://res.cloudinary.com/dcp34rync/image/upload/v1690730229/discord_m68yvd.png
    const filename = "image.png"; 
  
    download(uri, filename, async function(){
        try {
            const mediaId = await client.v1.uploadMedia("./image.png");
            await rwClient.v2.tweet({
                text: "Hello world! This is my profile Pic",
                media: {
                    media_ids: [mediaId]
                }
            });
        } catch (e) {
            console.log(e)
        }
    });
    const str = "posted...";
    return str;
  }

// Call any of methods and you are done
router.post("/api/uploadToTwitter", (req, res) => {
  const {url} = req.body;
  console.log(url);
  const result =  tweet(url) 
  res.send(result);
});
