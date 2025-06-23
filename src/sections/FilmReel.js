import React, { useState } from 'react';
import { PieChart, Pie, Legend, Tooltip, Cell, BarChart, Bar, XAxis, YAxis } from 'recharts';
import Movies from "../data/MovieReviews.json"
import TV from '../data/TVReviews.json'
import RatingBar from '../components/RatingBar';
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

function GenreChart({palette}) {
    const fltr2 = (l1, l2, genre) => {
        return (l1.filter(x => x.genre == genre).length + l2.filter(x => x.genre == genre).length);
    } 
    
    const genresLst = ["comedy", "drama", "romance", "horror", "mystery"]
    const data = []
    for (let i = 0; i < genresLst.length; i++) {
        data[i] = {
            name: genresLst[i], value: fltr2(Movies, TV, genresLst[i])
        }
    }

    return(
        <div id="genre-chart">
            <h3>genre breakdown</h3>
            <PieChart className='film-chart' height={300} width={400}>
                <Pie data={data} cx="50%" cy="50%" outerRadius={80} dataKey="value">
                    {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={palette[index % palette.length]} />
                    ))}
                </Pie>
                <Tooltip />
                <Legend />
            </PieChart>
        </div>
    )
}

function TimelineChart({palette}) {
    const fltr = (lst, month)  => {
        return lst.filter(x => x.month == month).length;
    }

    const data = []
    for (let i = 1; i < 7; i++) {
        data[i - 1] = {
            name: i.toString(),
            shows: fltr(TV, i),
            movies: fltr(Movies, i)
        }
    }

    return(
        <div id="timeline-chart">
            <h3># of shows + movies watched each month</h3>
            <BarChart width={400} height={300} data={data}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="shows" stackId="a" fill={palette[3]} />
                <Bar dataKey="movies" stackId="a" fill={palette[4]} />
            </BarChart>
        </div>
    )
}

function RatingChart({palette}) {
    const fltr2 = (l1, l2, rating) => {
        return (l1.filter(x => x.rating == rating).length + l2.filter(x => x.rating == rating).length);
    } 

    const ratings = ["s1", "s2", "s3", "s4", "s5"]
    const data = []
    for(let i = 1; i <= 5; i++) {
        data[i - 1] = {
            name: i.toString(),
            value: fltr2(Movies, TV, ratings[i - 1])
        }
    }

    return(
        <div>
            <h3># of shows / movies with each rating</h3>
            <BarChart width={400} height={285} data={data}>
                <XAxis datakey="name"/>
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" >
                    {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={palette[index % palette.length]} />
                    ))}
                </Bar>
            </BarChart>
        </div>
    )
}

function FilmReel() {
    const COLORS = ['rgb(242, 237, 165)', '#ffd9a4', '#fcd7e9', '#debef6', "#c4e1f6"];
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
                <GenreChart palette={COLORS}/>
                <TimelineChart palette={COLORS}/>
                <RatingChart palette={COLORS}/>
            </div>
            
        </div>
    )
}
export default FilmReel;