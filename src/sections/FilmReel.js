import React, { useState, PureComponent } from 'react';
import Movies from "../data/MovieReviews.json"
import TV from '../data/TVReviews.json'
import RatingBar from '../components/RatingBar';
import MyPie from '../charts/MyPie';
import StackedBarGraph from '../charts/StackedBarGraph'
import BarGraph from '../charts/BarGraph';
import "../style/FilmReel.css";
import { Treemap, Tooltip, Bar } from 'recharts'

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
  
function Themes({films}) {
    const themeCounts = {};
    films.forEach(({ theme }) => {
        const themes = Array.isArray(theme) ? theme : [];
        themes.forEach(t => {
            if (!themeCounts[t]) {
                themeCounts[t] = 0;
            }
            themeCounts[t] += 1;
        });
    });

    const data = Object.entries(themeCounts).map(([theme, count]) => ({
        name: theme,
        size: count
      }));
      
    return(
        <div style={{margin: "10px 0px 0px 30px"}}>
            <h3>themes</h3>
            <Treemap
            width={800}
            height={300}
            data={data}
            dataKey="size"
            nameKey="name"
            fontSize={8}
            >
            <Tooltip />
        </Treemap>
        </div>
    )
}

function FilmReel() {
    const films = [...Movies, ...TV]
    const w = 400
    const h = 300
    const COLORS = [
        'rgb(242, 237, 165)', '#ffd9a4', '#fcd7e9', '#debef6', "#c4e1f6"
    ];
    const ratings = [
        "s1", 's2', 's3', 's4', 's5'
    ]
    const genreLst = [
        'horror', 'comedy', 'mystery', 'romance', 'drama'
    ]
    const decadesLst = [
        '1980s', '1990s', '2000s', '2010s', '2020s'
    ]

      const genreStats = films.reduce((acc, { genre, points }) => {
        if (!acc[genre]) {
          acc[genre] = { total: 0, count: 0 };
        }
        acc[genre].total += points;
        acc[genre].count += 1;
        return acc;
      }, {});
    
      const genreStatsData = Object.entries(genreStats).map(([genre, { total, count }]) => ({
        genre,
        avgPoints: total / count
      })).sort((a, b) => b.avgPoints - a.avgPoints);

      const decadeStats = films.reduce((acc, { decade, points }) => {
        if (!acc[decade]) {
          acc[decade] = { total: 0, count: 0 };
        }
        acc[decade].total += points;
        acc[decade].count += 1;
        return acc;
      }, {});
    
      const decadeStatsData = Object.entries(decadeStats).map(([decade, { total, count }]) => ({
        decade,
        avgPoints: total / count
      })).sort((a, b) => a.decade.localeCompare(b.decade));
    
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
            <div className="charts" id="film-charts">
                <MyPie palette={COLORS}
                    categories={genreLst}
                    w={w} h={h} 
                    lst={films} 
                    k='genre'/>
                
                <BarGraph title="avg rating by genre"
                    palette={COLORS}
                    w={w} h={h}
                    dataIn={genreStatsData}
                    xaxis="genre"
                    bar="avgPoints"/>

                <BarGraph title="avg rating by decade"
                    palette={COLORS}
                    w={w} h={h}
                    dataIn={decadeStatsData}
                    xaxis="decade"
                    bar="avgPoints"/>

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
                    
            <Themes films={films}/>
            </div>
        </div>
    )
}
export default FilmReel;