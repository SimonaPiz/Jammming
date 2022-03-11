//import logo from './logo.svg';
import React from 'react';
import { Playlist } from '../Playlist/Playlist.js';
import { SearchBar } from '../SearchBar/SearchBar.js';
import { SearchResults } from '../SearchResults/SearchResults.js';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [
        {name: 'name1', artist: 'artist1', album: 'album1', id: 1},
        {name: 'name2', artist: 'artist2', album: 'album2', id: 2},
        {name: 'name3', artist: 'artist3', album: 'album3', id: 3}
      ],
      playlistName: 'User Playlist',
      playlistTracks: [
        {name: 'plName4', artist: 'plArtist4', album: 'plAlbum4', id: 4},
        {name: 'plName5', artist: 'plArtist5', album: 'plAlbum5', id: 5},
        {name: 'plName6', artist: 'plArtist6', album: 'plAlbum6', id: 6}
      ]
    };

    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
  }

  addTrack(track) {
    let plTracks = this.state.playlistTracks;
    if (plTracks.find(plTrack => plTrack.id === track.id)) {
      return;
    } else {
      plTracks.push(track);
      this.setState({plTracks});
    };
  }

  removeTrack(track) {
    let plTracks = this.state.playlistTracks;
    if(plTracks.find(plTrack => plTrack.id === track.id)) {
      let index = plTracks.indexOf(track);
      plTracks.splice(index,1);
      this.setState({plTracks});
    } else {
      return;
    };
  }

  updatePlaylistName(name) {
    this.setState({playlistName: name});
  }

  savePlaylist() {
    const plTracks = this.state.playlistTracks;
    const trackURIs = plTracks.map(plTrack => plTrack.uri);
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar />
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults} 
                           onAdd={this.addTrack}/>
            <Playlist playlistTracks={this.state.playlistTracks} 
                      playlistName={this.state.playlistName}
                      onRemove={this.removeTrack}
                      onNameChange={this.updatePlaylistName}
                      onSave={this.savePlaylist} /> 
          </div>
        </div>
      </div>
    );
  }
}

export default App;
