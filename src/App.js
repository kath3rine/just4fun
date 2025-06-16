import FilmReel from "./sections/FilmReel.js";
import FilmJournal from "./sections/FilmJournal.js";
import Bookshelf from "./sections/Bookshelf.js";
import Programming from "./sections/Programming.js";
import TraditionalArt from './sections/TraditionalArt.js';
import DigitalArt from './sections/DigitalArt.js';
import React, { useState } from 'react';
import TestIcon from "./assets/art/eye.JPG";

function DefaultHome() {
  return (
    <div>
      <h1>a website 4 things i like 2 do</h1>
      <h3>like if letterboxd and deviantart and goodreads and github had a baby</h3>
      <p>click on an icon above to get started</p>
    </div>
  )
}

function App() {
  const [idx, setIdx] = useState(0);

  const handleChange = (newIndex) => {
      setIdx(newIndex);
  } 

  const icons = [
    { text: "kat's scrapbook", component: <DefaultHome/> },
    { text: "create", img: TestIcon, component: 
      <div id="create">
        <TraditionalArt/>
        <DigitalArt/>
      </div> },
    { text: "watch", img: TestIcon, component: 
      <div id="create">
          <FilmReel/>
          <FilmJournal/>
        </div> },
    { text: "read", img: TestIcon, component: <Bookshelf/> },
    { text: "code", img: TestIcon , component: <Programming/>}
  ]

  return (
    <div className="App">
      <div>
        <div id="menu">
          {icons.map((icon, index) => (
            <div id="icon"
            key={index} 
            onClick={() => handleChange(index)}>
                <p className={index == 0 ? "bold-icon" : "normal-icon"}>{icon.text}</p>
                <img src={icon.img}/>
            </div>
          ))}
        </div>

        <div id="main">
            <div>{icons[idx].component}</div>
        </div>
      </div>
    </div>
  );
}

export default App;
