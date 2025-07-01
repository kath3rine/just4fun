import React, { useState } from 'react';
import Movies from "../data/MovieReviews.json"
import TV from '../data/TVReviews.json'
import RatingBar from '../components/RatingBar';
import "../style/FilmReel.css";
import {Stacked2, StackedBar, Themes, PieGraph,  AvgRating } from '../components/Charts.tsx'

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

function FilmCharts() {
    const films = [...Movies, ...TV]
    const genres = [ 'comedy', 'drama', 'horror', 'mystery', 'romance' ]
    const decades = [ '1970-80s', '1990s', '2000s', '2020s' ]
    const medias = [ "movies", "shows" ]
    const w = 430
    const h = 250

    function monthlyHrs() {
        const data = []
        for (let i = 1; i <= 12; i++) {
            data.push({
                name: i,
                movies: Movies.filter(x => x.month == i).length * 2,
                shows: TV.filter(x => x.month == i).reduce((acc, x) => acc + x.episodes, 0)
            })
        }
        return data
    } 

    function genreHrs() {
        var data = []
        for (const g of genres) {
            data.push({
                name: g,
                value: Movies.filter(x => x.genre == g).length * 2 + TV.filter(x => x.genre == g).reduce((acc, x) => acc + x.episodes, 0)
            })
        }
        return data
    }

    return(
        <div className="charts" id="film-charts"
            style={{textAlign: "center"}}>

                <PieGraph dataIn={[
                    { name: "movies", value: Movies.length * 2 },
                    { name: "shows", value: TV.reduce((acc, x) => x.episodes + acc, 0) }
                ]} 
                ratio={1.5 }
                w={w} h={h}
                title="media (hrs)"/>
                

                <PieGraph title="genre (hrs)"
                ratio={1.5}
                dataIn={genreHrs()}
                w={w} h={h}
                />

                <StackedBar lsts={[Movies, TV]}
                cols={decades}
                w={w} h={h}
                categories={medias}
                k="decade"
                title="decade released" />


                <Stacked2 title="hrs watched by genre" 
                w={w} h={h}
                movies={Movies} 
                shows={TV}
                k="genre" 
                categories={genres}/>

                <Stacked2 title="hrs watched per decade released"
                w={w} h={h}
                movies={Movies} 
                shows={TV}
                k="decade" 
                categories={decades}/>

                


                <AvgRating k="media"
                w={w} h={h}
                cleanData={[
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
                w={w} h={h}
                rawData={films}/>


                <AvgRating k="decade"
                w={w} h={h}
                rawData={films} />

                <StackedBar title="rating distribution by media"
                lsts={[Movies, TV]}
                k="points"
                categories={medias}
                w={w} h={h}
                cnt={5}/>

                <StackedBar title="rating distribution by genre" 
                lsts={films}
                categories={genres}
                w={w} h={h}
                k="points"
                target="genre"
                cnt={5}/>


                <StackedBar title="rating distribution by decade released" 
                lsts={films}
                categories={decades}
                k="points"
                w={w} h={h}
                target="decade"
                cnt={5}/>

                <StackedBar title="hrs watched each month"
                dataIn={monthlyHrs()}
                categories={medias}
                w={w} h={h}
                cnt={12}/>

                <StackedBar title="# watched per month by genre" 
                lsts={films}
                categories={genres}
                k="month"
                w={w} h={h}
                target="genre"
                cnt={12}/>
                
                <StackedBar title="# watched per month by decade released" 
                lsts={films}
                categories={decades}
                k="month"
                w={w} h={h}
                target="decade"
                cnt={12}/>

                <Themes dataIn={films}
                h={h}/>
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

            <h2 style={{borderTop: "1px #ddd solid", paddingTop: "20px"}}>
                stats
            </h2>
            <FilmCharts/>

        </div>
    )
}
export default FilmReel;