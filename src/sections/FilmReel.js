import React, { useState } from 'react';
import Movies from "../data/MovieReviews.json"
import TV from '../data/TVReviews.json'
import RatingBar from '../components/RatingBar';
import MyPie from '../charts/MyPie';
import StackedBarGraph from '../charts/StackedBarGraph'
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
    const films = [...TV, ...Movies]
    const w = 310
    const h = 300
    const COLORS = [
        'rgb(242, 237, 165)', '#ffd9a4', '#fcd7e9', '#debef6', "#c4e1f6"
    ];
    const ratings = [
        "s1", 's2', 's3', 's4', 's5'
    ]
    const genreLst = [
        'drama', 'mystery', 'horror', 'comedy', 'romance'
    ]
    const decadesLst = [
        '80s', '90s', '00s', '10s', '20s'
    ]
    const genreMap = films.reduce((acc, { genre, points }) => {
        if (!acc[genre]) {
          acc[genre] = 0;
        }
        acc[genre] += points;
        return acc;
      }, {});
    
      const genreData = Object.entries(genreMap).map(([genre, points]) => ({
        genre,
        points
      }));

      const decadeMap = films.reduce((acc, { decade, points }) => {
        if (!acc[decade]) {
          acc[decade] = 0;
        }
        acc[decade] += points;
        return acc;
      }, {});
    
      const decadeData = Object.entries(decadeMap).map(([decade, points]) => ({
        decade,
        points
      }));
    
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
            <div className="charts" id="film-charts">

            <MyPie palette={COLORS}
                categories={genreLst}
                w={w} h={h} 
                lst={films} 
                k='genre'/>

            <MyPie palette={COLORS} 
                categories={genreLst} 
                k="genre by points"
                w={w} h={h} 
                dataIn={genreData}/>

            <StackedBarGraph 
                cols={[COLORS[0], COLORS[1]]}
                keys={Array.from({ length: 12 }, (_, i) => i + 1)} 
                xaxis="month" 
                k="month"
                lsts={[Movies, TV]} 
                bars={["movies", "shows"]} 
                w={w} h={h}
                title="month watched" />
            
            <StackedBarGraph cols={[COLORS[0], COLORS[1]]} 
                keys={decadesLst}
                lsts={[Movies, TV]} 
                bars={["movies", "shows"]}
                xaxis="decade" 
                k="decade" 
                w={w} h={h}
                title="decade released" />

            <StackedBarGraph cols={[COLORS[0], COLORS[1]]} 
                keys={["s1", 's2', 's3', 's4', 's5']}
                lsts={[Movies, TV]} 
                bars={["movies", "shows"]}
                xaxis="rating" 
                k="rating" 
                w={w} h={h}
                title="rating distribution (by media)" />

            <StackedBarGraph cols={COLORS}
                keys={ratings} 
                k="rating"
                lst={films} 
                bars={genreLst} 
                w={w} h={h}
                title="rating distribution (by genre)" 
                target="genre"/>

            <StackedBarGraph cols={COLORS}
                bars={decadesLst} 
                k="rating" 
                target="decade"
                lst={films}  
                w={w} h={h} 
                keys={ratings}
                title="rating distribution (by decade)"/>



            </div>
        </div>
    )
}
export default FilmReel;