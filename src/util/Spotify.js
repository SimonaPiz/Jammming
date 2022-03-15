let accessToken;
const clientId = '886fa341ef8d4583ac685605960aa9a4';
const redURI = 'http://localhost:3000/';

const Spotify = {
  getAccessToken() {
    if (accessToken) {
      return accessToken;
    }

    // check for access token match
    const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
    const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);

    if (accessTokenMatch && expiresInMatch) {
      accessToken = accessTokenMatch[1];
      const expiresIn = Number(expiresInMatch[1]);
      //This clear the parameters, allowing us to grab a new access token when it expires
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
    return fetch(
      `https://api.spotify.com/v1/search?type=track&q=${inputTerm}`, 
      {headers: {Authorization: `Bearer ${accessToken}`}}
    ).then(
      response => {
        return response.json();
      }
    ).then(
      jsonResponse => {
        if(!jsonResponse.tracks) {
          return [];
        } else {
          return jsonResponse.tracks.items.map(track => (
            {
              id: track.id,
              name: track.name,
              artist: track.artists[0].name,
              album: track.album.name,
              uri: track.uri
            }
          ));
        };
      }
    );
  },

  savePlayList(plName, trackUriArr) {
    if (!plName || !trackUriArr.length) {
      return;
    }

    const accessToken = Spotify.getAccessToken();
    const headers = { Authorization: `Bearer ${accessToken}`};
    let userId;
    return fetch(
      `https://api.spotify.com/v1/me`,
      {headers: headers}  
    ).then(
      response => { return response.json();}
    ).then(
      jsonResponse => {
        userId = jsonResponse.id;
        return fetch(
          `https://api.spotify.com/v1/users/${userId}/playlists`,
          {
            method:'POST',
            headers: headers,
            body: JSON.stringify({name: plName})
          }
        ).then( response => response.json()
        ).then(
          jsonResponse => {
            const playlistId = jsonResponse.id;
            return fetch(
              `https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`,
              {
                method: 'POST',
                headers: headers,
                body: JSON.stringify({uris: trackUriArr})
              }
            );
          }
        );
      }
    );
  }
};

export default Spotify;