import React from 'react';
import { BrowserRouter, Route, Routes, Link } from 'react-router';
import TraditionalArt from './sections/TraditionalArt.js';
import DigitalArt from './sections/DigitalArt.js';
import FilmJournal from './sections/FilmJournal.js';
import FilmReel from './sections/FilmReel.js'
import Bookshelf from './sections/Bookshelf.js'
import Programming from "./sections/Programming.js";
import Playlist25 from './sections/Playlist25.js';
import Favorites from './sections/Favorites.js'
import Thoughts from './data/Thoughts.json'
import Notes from './components/Notes.js'
import Shhh from './sections/Shhh.js'

function App() {
  const items = [
    { 
      path: "/", title: "home",
      element: 
      <div id="home-page" className='page'>
        <h1>my dumpster</h1>
        <p>
          congrats, u found my (evidently not so) secret corner of the internet-- 
          <a href="https://kath3rine.github.io">
              (my public persona here)
          </a>
        </p>
        <Favorites/>
        <Notes notes={Thoughts}/>
      </div>
    },
    { 
      path: "/create", title: "create 🎨",
      element: 
      <div id="create-page" className='page'>
        <TraditionalArt/>
        <DigitalArt/>
      </div>
    },
    { 
      path: "/watch", title: "watch 👀",
      element: 
      <div id="watch-page" className='page'>
        <FilmReel/>
        <FilmJournal/>
      </div>
    },
    { 
      path: "/listen", title: "listen 🎧",
      element: 
      <div id="listen" className='page'>
        <Playlist25/>
      </div>
    },
    { 
      path: "/read", title: "read 📚",
      element: 
      <div id="read-page" className='page'>
        <Bookshelf/>
      </div>
    },
    {  
      path: "/code", title: "code 💻",
      element: 
      <div id="code-page" className='page'>
        <Programming/>
      </div>
    }
  ]

  return (
    <div className="App">
      <BrowserRouter basename="/just4fun">
        <nav>
          {items.map((item) => (
            <Link className="menu-item" id={item.title} to={item.path}>{item.title}</Link>
          ))}
        </nav>
        <Routes>
          {items.map((item) => (
            <Route path={item.path} element={item.element}/>
          ))}
          <Route path="/secret" element={<Shhh/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
