let accessToken;
const clientId = '886fa341ef8d4583ac685605960aa9a4';
const redURI = 'http://localhost:3000/';

const Spotify = {
  getAccessToken() {
    if (accessToken) {
      return accessToken;
    };

    // check for access token match
    const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
    const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);

    if (accessTokenMatch && expiresInMatch) {
      accessToken = accessTokenMatch[1];
      const expiresIn = Number(expiresInMatch[1]);

      window.setTimeout(() => accessToken = '', expiresIn * 1000);
      window.history.pushState('Access Token', null, '/');
      return accessToken;
    } else {
      const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redURI}`;
      window.location = accessUrl;
    }
  },

  search(inputTerm) {
    const accessToken = Spotify.getAccessToken();
    fetch(
      `https://api.spotify.com/v1/search?type=track&q=${inputTerm}`, 
      {headers: {Authorization: `Bearer ${accessToken}`}}
    ).then(
      response => {
        return response.json();
      }
    ).then(
      jsonResponse => {
        if(jsonResponse.tracks) {
          return [];
        }
        return jsonResponse.tracks.items.map(track => (
          {
            id: track.id,
            name: track.name,
            artist: track.artist[0].name,
            album: track.album.name,
            uri: track.uri
          }
        ));
      }
    );
  }
};

export default Spotify;