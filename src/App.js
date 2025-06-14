import TraditionalArt from "./sections/TraditionalArt.js";
import DigitalArt from "./sections/DigitalArt.js";
import FilmReel from "./sections/FilmReel.js";
import Bookshelf from "./sections/Bookshelf.js";

function App() {
  return (
    <div className="App">
      <h1>like if letterboxd and deviantart and spotify and goodreads had a baby</h1>
      <TraditionalArt/>
      <DigitalArt/>
  <FilmReel />
      <Bookshelf/>
    </div>
  );
}

export default App;
