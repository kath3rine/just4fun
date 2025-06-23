import React, { useState } from 'react';
import { PieChart, Pie, Legend, Tooltip, Cell, BarChart, Bar, XAxis, YAxis } from 'recharts';
import Movies from "../data/MovieReviews.json"
import TV from '../data/TVReviews.json'
import RatingBar from '../components/RatingBar';
import "../style/FilmReel.css";
import Note from '../components/Notes.js'
import GenreChart from '../components/GenreChart';
import RatingChart from '../components/RatingChart';
import StackedTimelineChart from '../components/StackedTimelineChart';

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
                        <img src={film.img}/>
                        <p id="film-title">{film.title}</p>
                    </div>

                    <div className={film.rating} id="film-back">
                        <p id="details">#{index + 1} - {film.date} - {film.genre} {
                            film.seasons 
                            ? <span> - {film.seasons} seasons</span> 
                            : <p></p>} 
                        </p>
                        <p id="review">{film.review}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

function FilmReel() {
    const films = [...Movies, ...TV]
    const COLORS = ['rgb(242, 237, 165)', '#ffd9a4', '#fcd7e9', '#debef6', "#c4e1f6", "#ddd"];
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
            
            <h2>stats</h2>
            <div id="film-charts">
                <GenreChart palette={COLORS} lst={films}
                    w={400} h={300}/>
                <StackedTimelineChart palette={COLORS} lst1={Movies} lst2={TV}
                    w={400} h={300}
                    title="# of shows + movies watched per month"/>
                <RatingChart palette={COLORS} lst={films}
                w={400} h={285}
                title="ratings vs # of shows/movies" />
            </div>
            
        </div>
    )
}
export default FilmReel;