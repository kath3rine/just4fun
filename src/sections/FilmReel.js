import React, { useState } from 'react';
import Movies from "../data/MovieReviews.json"
import TV from '../data/TVReviews.json'
import RatingBar from '../components/RatingBar';
import "../style/FilmReel.css";
import { PieGraph } from '../charts/Pies'
import { AvgRating, Stacked } from '../charts/Bars'
import { Themes } from '../charts/Trees'

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
                        <p id="details">#{index + 1} | {film.date} {
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

const films = [...Movies, ...TV]
const genres = [ 'horror', 'mystery', 'drama', 'comedy', 'romance' ]
const decades = [ '1980s', '1990s', '2000s', '2020s' ]
const medias = [ "movies", "shows" ]
 



function FilmReel({dataIn}) {
    
    
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
            
            <h2 style={{borderTop: "1px #ddd solid", paddingTop: "20px"}}>
                stats
            </h2>
            <div className="charts" id="film-charts"
            style={{textAlign: "center"}}>

                <PieGraph dataIn={[
                    {
                        name: "movies",
                        value: Movies.length * 2
                    },
                    {
                        name: "shows",
                        value: TV.reduce((acc, x) => x.episodes + acc, 0) * TV.length
                    }
                ]} 
                target="media"/>
                
                <PieGraph categories={genres}
                lst={films}
                target="genre"/>

                <Stacked lsts={[Movies, TV]}
                cols={decades}
                categories={medias}
                k="decade"
                title="decade released" />

                <AvgRating k="media"
                data={[
                    {
                        media: "movies",
                        avgPoints: Movies.reduce((acc, x) => x.points + acc, 0) / Movies.length
                    },
                    {
                        media: "shows",
                        avgPoints: TV.reduce((acc, x) => x.points + acc, 0) / TV.length 
                    }
                ]}/>

                <AvgRating k="genre"
                data={Object.entries(
                    films.reduce((acc, { genre, points }) => {
                        if (!acc[genre]) {
                          acc[genre] = { total: 0, count: 0 };
                        }
                        acc[genre].total += points;
                        acc[genre].count += 1;
                        return acc;
                    }, {})
                ).map(([genre, { total, count }]) => ({
                    genre,
                    avgPoints: total / count
                })).sort((a, b) => b.avgPoints - a.avgPoints )}/>


                <AvgRating k="decade"
                data={Object.entries(
                    films.reduce((acc, { decade, points }) => {
                        if (!acc[decade]) {
                          acc[decade] = { total: 0, count: 0 };
                        }
                        acc[decade].total += points;
                        acc[decade].count += 1;
                        return acc;
                    }, {})
                ).map(([decade, { total, count }]) => ({
                    decade,
                    avgPoints: total / count
                })).sort((a, b) => a.decade.localeCompare(b.decade))} />

                <Stacked title="rating distribution by media"
                lsts={[Movies, TV]}
                k="points"
                categories={medias}
                cnt={5}/>

                <Stacked title="rating distribution by genre" 
                lsts={films}
                categories={genres}
                k="points"
                target="genre"
                cnt={5}/>


                <Stacked title="rating distribution by decade released" 
                lsts={films}
                categories={decades}
                k="points"
                target="decade"
                cnt={5}/>

                <Stacked title="hrs watched each month"
                lsts={[Movies, TV]}
                categories={medias}
                k="month"
                cnt={12}/>

                <Stacked title="# watched per month by genre" 
                lsts={films}
                categories={genres}
                k="month"
                target="genre"
                cnt={12}/>
                
                <Stacked title="# watched per month by decade released" 
                lsts={films}
                categories={decades}
                k="month"
                target="decade"
                cnt={12}/>

                <Themes dataIn={films}/>
            </div>
        </div>
    )
}
export default FilmReel;