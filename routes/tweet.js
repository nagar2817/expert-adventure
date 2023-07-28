

// const { TwitterApi } = require('twitter-api-v2');



// // Twitter API client for OAuth
// const twitterClient = new TwitterApi({
//   appKey: consumerKey,
//   appSecret: consumerSecret,
// });

// let userAccessToken = null;

// app.get('/api/twitter/login', async (req, res) => {
//   try {
//     const authUrl = await twitterClient.v1.oauth1.getAuthorizationUrl({
//       oauth_callback: 'http://localhost:3000/callback', // Replace with your frontend URL callback
//     });

//     res.redirect(authUrl);
//   } catch (error) {
//     console.error('Error initiating Twitter login:', error);
//     res.status(500).json({ error: 'Error initiating Twitter login' });
//   }
// });

// app.get('/callback', async (req, res) => {
//   const { oauth_token, oauth_verifier } = req.query;

//   try {
//     const authResponse = await twitterClient.v1.oauth1.getAccessToken({
//       oauth_token,
//       oauth_verifier,
//     });

//     // Save the user access token for future use
//     userAccessToken = authResponse.oauth_token;

//     res.redirect('http://localhost:3000'); // Redirect back to your frontend application
//   } catch (error) {
//     console.error('Error getting Twitter access token:', error);
//     res.status(500).json({ error: 'Error getting Twitter access token' });
//   }
// });

// app.post('/api/twitter/tweet', async (req, res) => {
//   const { base64Data, status } = req.body;

//   try {
//     // Twitter API client for posting tweets on behalf of the user
//     const userTwitterClient = new TwitterApi({
//       accessToken: userAccessToken,
//     });

//     const tweetMediaResponse = await userTwitterClient.v1.tweets.createWithMedia({
//       status,
//       media_data: base64Data,
//     });

//     res.status(200).json({ message: 'Tweet posted successfully', tweet: tweetMediaResponse });
//   } catch (error) {
//     console.error('Error posting tweet:', error);
//     res.status(500).json({ error: 'Error posting tweet' });
//   }
// });




