import React, { useState } from 'react';
import films from "../data/FilmData.json"
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
                        <h1>{film.title}</h1>
                        <p>{index}</p>
                    </div>

                    <div className={film.rating} id="film-back">
                        <p>{film.date}</p>
                        <p>{film.review}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

function FilmReel() {
    return(
        <div id="film-reel">
            <h1>moviez</h1>
            <div id="reel">
                    {films.map((film, index) => (
                    <Film film={film} index={index}/>
                ))}
            </div>
            
        </div>
    )
}
export default FilmReel;