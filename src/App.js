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
import FilmLists from './data/FilmLists.json'
import Notes from './components/Notes.js'
import Shhh from './sections/Shhh.js';

function App() {
  const items = [
    { 
      path: "/", title: "home",
      element: 
      <div id="home-page" className='page'>
        <h1>my dumpster</h1>
        <h3>a website 4 things i like 2 do - click a link above 2 get started</h3>
        <h3>like if deviantart and letterboxd and spotify and goodreads and github had a baby </h3>
        <Favorites/>
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
        <Notes notes={FilmLists}/>
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
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
