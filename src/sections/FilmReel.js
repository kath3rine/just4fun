import React, { useState } from 'react';
import Movies25 from "../data/MovieReviews.json"
import Movies24 from '../data/MovieReviews24.json'
import Movies23 from '../data/MovieReviews23.json'
import TV25 from '../data/TVReviews.json'
import TV24 from '../data/TVReviews24.json'
import TV23 from '../data/TVReviews23.json'
import RatingBar from '../components/RatingBar';
import "../style/FilmReel.css";
import {Stacked2, StackedArea, StackedBar, Themes, PieGraph,  AvgRating } from '../components/Charts.tsx'

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


function FilmChartsCombo() {
    const w = 400
    const h = 200
    const years = [2023, 2024, 2025]

    const genres = [ 'comedy', 'drama', 'horror', 'mystery', 'romance', 'sci-fi' ]
    const decades = [ '<=1970s', '1980s', '1990s', '2000s', '2010s', '2020s' ]
    const medias = [ "movies", "shows" ]

    function monthlyHrs(movies, tv) {
        const data = []
        for (let i = 1; i <= 12; i++) {
            data.push({
                name: i,
                movies: movies.filter(x => x.month == i).length * 2,
                shows: tv.filter(x => x.month == i).reduce((acc, x) => acc + x.episodes, 0)
            })
        }
        return data
    } 

    function genreHrs(movies, tv) {
        var data = []
        for (const g of genres) {
            data.push({
                name: g,
                value: movies.filter(x => x.genre == g).length * 2 + tv.filter(x => x.genre == g).reduce((acc, x) => acc + x.episodes, 0)
            })
        }
        return data
    }
    const lsts = [
        [...Movies23, ...TV23],
        [...Movies24, ...TV24],
        [...Movies25, ...TV25]
    ]

    const data = [
        { 
            movies: Movies25, 
            tv: TV25, 
            films: [...Movies25, ...TV25], 
            year: 2025
        },
        { 
            movies: Movies24, 
            tv: TV24, 
            films: [...Movies24, ...TV24], 
            year: 2024},
        { 
            movies: Movies23, 
            tv: TV23, 
            films: [...Movies23, ...TV23], 
            year: 2023}
    ]

    function hrsPerMonthCombo() {
        const data = []
        for (let i = 1; i <= 12; i++) {
            data.push({
                name: i,
                "2025": Movies25.filter(x => x.month == i).length * 2 + TV25.filter(x => x.month == i).reduce((acc, x) => acc + x.episodes, 0),
                "2024": Movies24.filter(x => x.month == i).length * 2 + TV24.filter(x => x.month == i).reduce((acc, x) => acc + x.episodes, 0),
                "2023": Movies23.filter(x => x.month == i).length * 2 + TV23.filter(x => x.month == i).reduce((acc, x) => acc + x.episodes, 0)
            })
        }
        return data
    }

    return(
        <div style={{display: "flex", flexWrap: "wrap"}}>

            <StackedArea dataIn = {hrsPerMonthCombo()} 
            title="hrs watched per month"
            categories={years} 
            h={h} w={w}/> 

            <Themes dataIn={[
                ...Movies23, ...Movies24, ...Movies25, 
                ...TV23, ...TV24, ...TV25
            ]}
                h={300}/>
            
            { data.map((item, index) => (
                <div style={{borderRight: "1px #bbb solid", margin: "5px"}}>
                    <h2>{item.year} film stats</h2>

                    <PieGraph dataIn={[
                        { name: "movies", value: item.movies.length * 2 },
                        { name: "shows", value: item.tv.reduce((acc, x) => x.episodes + acc, 0) }
                    ]} 
                    ratio={1.25 }
                    w={w} h={h}
                    title="media (hrs)"/>
                                
                
                    <PieGraph title="genre (hrs)"
                    ratio={1.25}
                    dataIn={genreHrs(item.movies, item.tv)}
                    w={w} h={h}/>
                
                    <StackedBar lsts={[item.movies, item.tv]}
                    cols={decades}
                    w={w} h={h}
                    categories={medias}
                    k="decade"
                    domain={9}
                    title="decade released" />
                
                
                    <Stacked2 title="hrs watched by genre" 
                    w={w} h={h}
                    movies={item.movies} 
                    shows={item.tv}
                    k="genre" 
                    domain={60}
                    categories={genres}/>
                
                    <Stacked2 title="hrs watched per decade released"
                    w={w} h={h}
                    domain={60}
                    movies={item.movies} 
                    shows={item.tv}
                    k="decade" 
                    categories={decades}/>
                
                    <AvgRating k="media"
                    w={w} h={h}
                    cleanData={[
                        {
                            media: "movies",
                            avgPoints: item.movies.reduce((acc, x) => x.points + acc, 0) / item.movies.length
                        },
                        {
                            media: "shows",
                            avgPoints: item.tv.reduce((acc, x) => x.points + acc, 0) / item.tv.length 
                        }
                    ]}/>
                
                    <AvgRating k="genre"
                    w={w} h={h}
                    color={4-index}
                    rawData={item.films}/>
                
                
                    <AvgRating k="decade"
                    w={w} h={h}
                    color={4-index}
                    rawData={item.films} />
                
                    <StackedBar title="rating distribution by media"
                    lsts={[item.movies, item.tv]}
                    k="points"
                    categories={medias}
                    w={w} h={h}
                    cnt={5}/>
                
                    <StackedBar title="rating distribution by genre" 
                    lsts={item.films}
                    categories={genres}
                    w={w} h={h}
                    k="points"
                    target="genre"
                    cnt={5}/>
                
                
                    <StackedBar title="rating distribution by decade released" 
                                lsts={item.films}
                                categories={decades}
                                k="points"
                                w={w} h={h}
                                target="decade"
                                cnt={5}/>
                
                                <StackedBar title="hrs watched each month"
                                dataIn={monthlyHrs(item.movies, item.tv)}
                                categories={medias}
                                w={w} h={h}
                                domain={32}
                                cnt={12}/>
                
                                <StackedBar title="# watched per month by genre" 
                                lsts={item.films}
                                categories={genres}
                                domain={9}
                                k="month"
                                w={w} h={h}
                                target="genre"
                                cnt={12}/>
                                
                                <StackedBar title="# watched per month by decade released" 
                                lsts={item.films}
                                domain={9}
                                categories={decades}
                                k="month"
                                w={w} h={h}
                                target="decade"
                                cnt={12}/>
                            </div>
            ))}
        
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
                {Movies25.map((film, index) => (
                    <Film film={film} index={index}/>
                ))}
            </div>
            
            <h3>shows</h3>
            <div className="reel" id='tv-reel'>
                {TV25.map((film, index) => (
                    <Film film={film} index={index}/>
                ))}
            </div>

            <FilmChartsCombo/>

        </div>
    )
}
export default FilmReel;