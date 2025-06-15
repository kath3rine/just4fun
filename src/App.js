import Create from "./pages/Create.js";
import FilmReel from "./components/FilmReel.js";
import Bookshelf from "./components/Bookshelf.js";
import React, { useState } from 'react';
import CreateIcon from "./assets/test.png";
import WatchIcon from "./assets/test.png";
import ReadIcon from "./assets/test.png";

function App() {
  const [idx, setIdx] = useState(0);

  const handleChange = (newIndex) => {
      setIdx(newIndex);
  }  

  const pages = [
    <div>
      <h1>like if letterboxd and deviantart and goodreads had a baby</h1>
      <p>click on an icon above to get started</p>
    </div>,
    <Create/>,
    <FilmReel/>,
    <Bookshelf/>
  ]
  const icons = [
    {
      text: "kat's scrapbook"
    },
    {
      text: "create",
      img: CreateIcon
    },
    {
      text: "watch",
      img: WatchIcon
    },
    {
      text: "read",
      img: ReadIcon
    }
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
          <h3><a href="https://kath3rine.github.io/#projects">full technical portfolio</a></h3>
        </div>

        <div id="main">

            <div>{pages[idx]}</div>
        </div>
      </div>
    </div>
  );
}

export default App;
