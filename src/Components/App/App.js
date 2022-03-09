//import logo from './logo.svg';
import { SearchBar } from '../SearchBar/SearchBar.js';
import './App.css';

function App() {
  return (
    <div>
      <h1>Ja<span className="highlight">mmm</span>ing</h1>
      <div className="App">
        {SearchBar}
        <div className="App-playlist">
          Add a SearchResults component 
          Add a Playlist component 
        </div>
      </div>
    </div>
  );
}

export default App;
