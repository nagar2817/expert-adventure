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

// Create textTweet function which post
// a text only tweet
const textTweet = async (res) => {
  try {
    // Use .tweet() method and pass the
    // text you want to post
    await rwClient.v2.tweet("Hii this is my 2 tweet");

    console.log("success");
    res.status(200).json({ message: "Tweet posted successfully!" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Failed to post text tweet." });
  }
};

const tweet = async (url) => {

    const uri = url;
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

// Create tweet function which post
// tweet with media and text



const mediaTweet = async (res, imageFile) => {
  try {
    // Create mediaID
    // const mediaFile = "C:/Users/Vishwanath Pawar/Documents/MyWebD/Front End/Web Development/Naagaur/test2/expert-adventure/routes/po.png";
    // const mediaFile = "C:/Users/rohit/Desktop/photos/wallpaper-805.jpg"
    
    // const mediaFile = imageFile; 
    // console.log(mediaFile);
    const response = await axios.get(imageFile, { responseType: 'arraybuffer' });
    console.log(response.data);

    // Convert the image data to a Blob object
    const imageBlob = new Blob([response.data], { type: 'image/jpg' });
    const mediaId = await client.v1.uploadMedia(
      // Put path of image you wish to post 
      imageBlob
    );
  console.log("recieve mediaId..");

    
    await rwClient.v2.tweet({
      text: "Twitter is a fantastic social network. Look at this:",
      media: { media_ids: [mediaId] },
    });
    console.log("success");
    res
      .status(200)
      .json({ message: "Image uploaded and tweet posted successfully!" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Failed to post media tweet." });
  }
};

// Call any of methods and you are done
router.post("/api/uploadToTwitter", (req, res) => {
    // console.log(req.body) 
  const {url} = req.body;
  // console.log('body..')
  console.log(url);
  // if (!image) {
  //   return res.status(400).json({ error: "No image file provided." });
  // }
  // console.log("image selected..");
  //   textTweet(res);
//   const imageFile = "C:\Users\rohit\Desktop\photos\wallpaper-805.jpg"
  const result =  tweet(url) 
  res.send(result);
//   mediaTweet(res, image);
  //   return res.status(200).json({ message: "ok" });
});
