import React, { useState } from 'react';
import Movies from "../data/MovieReviews.json"
import TV from '../data/TVReviews.json'
import RatingBar from '../components/RatingBar';
import "../style/FilmReel.css";

function Film({film, index}) {
    const [isFlipped, setIsFlipped] = useState(false);
  
    const handleClick = () => {
      setIsFlipped(!isFlipped);
    };

    let x = film.seasons ? film.seasons : 1

    const filmStyle = {
        width: `${125 * x}px`,
    }

    const filmFrontStyle = {
        marginLeft: `${(125 * x - 105) * 0.5}px`,
    }

    return (
        <div id="wrapper1">
            <div id="wrapper2">
                <div style={filmStyle} className={`film ${isFlipped ? 'flipped' : ''}`} onClick={handleClick}>
                    <div className={film.rating} id="film-front">
                        <img style={filmFrontStyle} src={film.img}/>
                        <p id="film-title">{film.title}</p>
                    </div>

                    <div className={film.rating} id="film-back">
                        <p id="details">#{index + 1} | watched on {film.date} {film.seasons ? <span> | {film.seasons} seasons</span> : <p></p>}</p>
                        <p id="review">{film.review}</p>
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
            <RatingBar/>
            
            <h3>movies</h3>
            <div className="reel">
                {Movies.map((film, index) => (
                    <Film film={film} index={index}/>
                ))}
            </div>
            
            <h3>shows</h3>
            <div className="reel" id='tv-reel'>
                {TV.map((film, index) => (
                    <Film film={film} index={index}/>
                ))}
            </div>
            
        </div>
    )
}
export default FilmReel;