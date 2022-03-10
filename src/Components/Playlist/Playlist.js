import React from "react";
import { TrackList } from "../TrackList/TrackList.js";
import './Playlist.css';

export class Playlist extends React.Component {
  constructor(props) {
    super(props);
    this.handleNameChange = this.handleNameChange.bind(this);
  }

  handleNameChange(e) {
    let input = e.target.value;
    this.props.onNameChange(input);
  }

  render() {
    return (
      <div className="Playlist">
        <input value={this.props.playlistName}
               onChange={this.handleNameChange} />
        <TrackList tracks={this.props.playlistTracks}
                   onRemove={this.props.onRemove}
                   isRemoval={true} /> 
        <button className="Playlist-save">SAVE TO SPOTIFY</button>
      </div>
    );
  }
}