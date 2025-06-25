import React, { useState } from 'react';
import Books from '../data/BookReviews.json'
import '../style/Bookshelf.css'
import RatingBar from '../components/RatingBar';
import { BarGraph, PieGraph, GradientBarGraph, RatingDist, AvgRating } from '../components/Charts'

function Book({book, c, index}) {
    const [isFlipped, setIsFlipped] = useState(false);
    const handleClick = () => {
        setIsFlipped(!isFlipped);
      };

    return(
        <div className={c}>
            <div className={`book ${isFlipped ? 'flipped' : ''}`} onClick={handleClick} id="book-in">
            <div className={book.rating} id="book-outside">
                <p>{index}</p>
                <p id="title">{book.title}</p>
            </div>

            <div className={book.rating} id="book-inside">
                <p>read on: {book.date}</p>
                <p id="review">{book.review}</p>
            </div>
                
            </div>
        </div>
        
    )
}

function Bookshelf() {
    const w = 300
    const h = 200
    const COLORS = ['rgb(242, 237, 165)', '#ffd9a4', '#fcd7e9', '#debef6', "#c4e1f6"];
    const months = Array.from({ length: 12 }, (_, i) => 
        ({ month: i + 1, pages: 0 })
    );
    const pagesMap = Books.reduce((acc, item) => {
        const { month, pages } = item;
        acc[month] = (acc[month] || 0) + pages;
        return acc;
      }, {});
    const pageData = months.map(({ month }) => ({
        month,
        pages: pagesMap[month] || 0,
      }));
    
    const genreLst = [
        "sci-fi", "romance", "mystery"
    ]
    
    return (
        <div id="bookshelf">
            <h1>my 2025 bookshelf</h1>
            <RatingBar/>
            <div id="bookshelf-content">
                <div id="shelf">
                        {Books.map((book, index) => (
                            <div>
                                { index > Books.length - (Books.length % 4) - 1  
                                    ? <Book book={book} index = {index + 1} c="bottom"/> 
                                    : <Book book={book} index = {index + 1} c="top"/>
                                }
                            </div>
                        ))}
                </div>
                <div className="charts">
                
                <PieGraph categories={genreLst}
                lst={Books}
                target='genre'/>
                

                <AvgRating data={
                    Object.entries(
                        Books.reduce((acc, { genre, points }) => {
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
                    })).sort((a, b) => b.avgPoints - a.avgPoints)
                }
                target="genre"/>

                <GradientBarGraph title="rating distribution"
                lst={Books} 
                target="points"/>

                <BarGraph lst={Books} 
                target="month"
                xaxis={Array.from({ length: 12 }, (_, i) => i + 1)}
                title="pages read each month"        />
                </div>
            </div>
        </div>
    )
}
export default Bookshelf;