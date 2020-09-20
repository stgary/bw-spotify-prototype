const router = require('express').Router();
const SpotifyWebApi = require('spotify-web-api-node');
const { CLIENT_ID, CLIENT_SECRET } = require('../vars/vars.js');

router.get('/:search', (req, res) => {
  const searchParams = req.params.search;
  
  const spotifyApi = new SpotifyWebApi({
    clientId: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
  });

  spotifyApi.clientCredentialsGrant()
    .then(data => {
        spotifyApi.setAccessToken(data.body['access_token']);
        
        return  spotifyApi.searchTracks(searchParams)
      })
      .then(data => {
        res.status(200).json(data.body)
      })
      .catch(error => {
        res.status(500).json(
          'Whoops! we could complete your search :(', error.message
        );
      });
});


module.exports = router;