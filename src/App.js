import TraditionalArt from "./sections/TraditionalArt.js";
import DigitalArt from "./sections/DigitalArt.js";
import FilmReel from "./sections/FilmReel.js";
import Bookshelf from "./sections/Bookshelf.js";
import React, { useState } from 'react';
import TraditionalArtIcon from "./assets/test.png";
import DigitalArtIcon from "./assets/test.png";
import FilmReelIcon from "./assets/test.png";
import BookshelfIcon from "./assets/test.png";

function App() {
  const [idx, setIdx] = useState(0);

  const handleChange = (newIndex) => {
      setIdx(newIndex);
  }  

  const pages = [
    <TraditionalArt/>,
    <DigitalArt/>,
    <FilmReel/>,
    <Bookshelf/>
  ]
  const icons = [
    {
      text: "traditional art",
      img: TraditionalArtIcon
    },
    {
      text: "digital art",
      img: DigitalArtIcon
    },
    {
      text: "watches",
      img: FilmReelIcon
    },
    {
      text: "reads",
      img: BookshelfIcon
    }
  ]

  return (
    <div className="App">
      <h1>like if letterboxd and deviantart and spotify and goodreads had a baby</h1>
      <div>
        <div id="menu">
          {icons.map((icon, index) => (
            <div id="icon" key={index} onClick={() => handleChange(index)}>
                <p>{icon.text}</p>
                <img src={icon.img}/>
            </div>
          ))}
        </div>

        <div id="main">
            <div>{pages[idx]}</div>
        </div>
      </div>
    </div>
  );
}

export default App;
