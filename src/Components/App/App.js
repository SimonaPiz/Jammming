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
      searchResults: [{name: ''}, {artist: ''}, {album: ''}, {id: ''}],
      playlistName: '',
      playlistTracks: [{name: ''}, {artist: ''}, {album: ''}, {id: ''}]
    };
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar />
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults}/>
            <Playlist playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks}/> 
          </div>
        </div>
      </div>
    );
  }
}

export default App;
