import React, { useState } from 'react';
import Movies from "../data/MovieReviews.json"
import TV from '../data/TVReviews.json'
import RatingBar from '../components/RatingBar';
import "../style/FilmReel.css";
import { AvgRating, StackedNum, StackedCat, PieGraph } from '../components/Charts'
import { Treemap, Tooltip, ResponsiveContainer} from  'recharts'

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
const genreLst = [ 'horror', 'comedy', 'mystery', 'romance', 'drama' ]
const decadesLst = [ '1980s', '1990s', '2000s', '2020s' ]
 

function Themes() {
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
        <div style={{width: "100%"}}>
            <h3>themes</h3>
            <ResponsiveContainer width="100%" height={200}>
            <Treemap
            data={data}
            dataKey="size"
            nameKey="name"
            fontSize={8}
            >
                <Tooltip />
            </Treemap>
            </ResponsiveContainer>
        </div>
    )
}

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
                
                <PieGraph categories={genreLst}
                lst={films}
                target="genre"/>


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
                
                <StackedCat lsts={[Movies, TV]}
                cols={decadesLst}
                categories={["movies", "shows"]}
                target="decade"
                title="decade released" />
                
                <AvgRating target="media"
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
                
                <AvgRating target="genre"
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

                
                <AvgRating target="decade"
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

                <StackedNum title="rating distribution: # watched"
                lsts={[Movies, TV]} 
                k="points"
                categories={["movies", "shows"]} 
                cnt={5}/>

                <StackedNum title="rating distribution: # watched"
                lsts={films}
                categories={genreLst}
                target="genre" cnt={5}
                k="points"/>

                <StackedNum title="rating distribution: # watched"
                lsts={films}
                categories={decadesLst}
                target="decade" cnt={5} k="points"/>
                    
                <StackedNum title="hrs watched per month"
                lsts={[Movies, TV]}
                categories={["movies", "shows"]}
                k="month"
                cnt={12}/>
                    
                <StackedNum title="# watched per month" 
                lsts={films}
                categories={genreLst}
                target="genre" cnt={12}
                k="month"/>


                <StackedNum title="# watched per month" 
                lsts={films}
                categories={decadesLst}
                target="decade" cnt={12}
                k="month"/>                

                <Themes/>
            </div>
        </div>
    )
}
export default FilmReel;