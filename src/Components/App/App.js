//import logo from './logo.svg';
import React from 'react';
import { Playlist } from '../Playlist/Playlist.js';
import { SearchBar } from '../SearchBar/SearchBar.js';
import { SearchResults } from '../SearchResults/SearchResults.js';
import './App.css';
import {Spotify} from '../../util/Spotify.js';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [],
      playlistName: 'New Playlist',
      playlistTracks: []
    };

    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
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
    const plName = this.state.playlistName;
    const trackURIs = this.state.playlistTracks.map(plTrack => plTrack.uri);
    //this.setState({playlistTracks: trackURIs});
    Spotify.savePlaylist(plName, trackURIs).then(() => {
      this.setState({
        playlistName: 'New Playlist',
        playlistTracks: []
      });
    });
  }

  search(inputTerm) {
    Spotify.search(inputTerm).then(searchResults => {
      this.setState({searchResults: searchResults});
    });
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar onSearch={this.search} />
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
