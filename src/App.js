import React from 'react';
import { BrowserRouter, Route, Routes, Link } from 'react-router';
import Art from './sections/Create.js';
import FilmJournal from './sections/FilmJournal.js';
import FilmReel from './sections/FilmReel.js'
import Bookshelf from './sections/Bookshelf.js'
import Playlist25 from './sections/Playlist25.js';
import Favorites from './sections/Favorites.tsx'
import Reports from './sections/Reports.js'
import Thoughts from './data/Thoughts.json'
import Notes from './components/Notes.tsx'
import Shhh from './sections/Shhh.js'

function Home() {
  return(
    <div id="home-page" className='page'>
        <h1>my dumpster</h1>
        <p style={{paddingBottom: "30px", borderBottom: "1px #bbb solid"}}>
          congrats, u found my (evidently not so) secret corner of the internet-- 
          <a href="https://kath3rine.github.io">
              (my public persona here)
          </a>
        </p>
        <Reports />
        <Favorites />
        <Notes notes={Thoughts}/>
    </div>
  )
}

function App() {
  const items = [
    { 
      path: "/", title: "home 🏠",
      element: 
      <div>
        <Home/>
      </div>
    },
    { 
      path: "/create", title: "create 🎨",
      element: 
      <div id="create-page" className='page'>
        <Art/>
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
