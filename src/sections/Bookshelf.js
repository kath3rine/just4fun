import React, { useState } from 'react';
import Books from '../data/BookReviews.json'
import '../style/Bookshelf.css'
import RatingBar from '../components/RatingBar';
import { PieGraph } from '../charts/Pies';
import { AvgRating, BarGraph } from '../charts/Bars';

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
    
    const genres = [ "sci-fi", "romance", "mystery" ]
    
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
                                
                <PieGraph categories={genres}
                lst={Books}
                target="genre"/>

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
                k="genre"/>

                <BarGraph title="rating distribution"
                lst={Books}
                k="points"
                offset={1}
                cnt={5}/>

                <BarGraph title="# of books read each month"
                lst={Books}
                offset={1}
                k="month"
                color={2}
                cnt={12}/>
                </div>
            </div>
        </div>
    )
}
export default Bookshelf;