import React, { useState } from 'react';
import Films from "../data/FilmReviews.json"
import "../style/FilmReel.css";

function Film({film, index}) {
    const [isFlipped, setIsFlipped] = useState(false);
  
    const handleClick = () => {
      setIsFlipped(!isFlipped);
    };

    return (
        <div id="wrapper1">
            <div id="wrapper2">
                <div className={`film ${isFlipped ? 'flipped' : ''}`} onClick={handleClick}>
                    <div className={film.rating} id="film-front">
                        <p>{index + 1}</p>
                        <h2>{film.title}</h2>
                        
                    </div>

                    <div className={film.rating} id="film-back">
                        <p>watched: {film.date}</p>
                        <p>{film.review}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

function FilmReel() {
    return(
        <div className="section" id="film-reel">
            <h1>my 2025 film reel</h1>
            <p>click each film 2 see my thoughts</p>
            <div id="reel">
                {Films.map((film, index) => (
                    <Film film={film} index={index}/>
                ))}
            </div>
            
        </div>
    )
}
export default FilmReel;