import React, { useState } from 'react';
import Books from '../data/BookReviews.json'
import '../style/Bookshelf.css'
import RatingBar from '../components/RatingBar';
import RatingChart from '../charts/RatingChart';
import GenreChart from '../charts/GenreChart';
import TimelineChart from '../charts/TimelineChart';

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
    const COLORS = ['rgb(242, 237, 165)', '#ffd9a4', '#fcd7e9', '#debef6', "#c4e1f6", "#ddd"];
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
                <div id="charts">
                    <GenreChart palette={COLORS} lst={Books}
                        w={600} h={200} field="genre"
                        keys={["sci-fi", "drama", "romance", "horror", "mystery"]}/>
                    <div id="charts2">
                        <RatingChart palette={COLORS} lst={Books}
                            w={350} h={200} 
                            title="ratings vs # of books"/>
                        <TimelineChart palette={COLORS} lst={Books} id="book-timeline"
                            w={350} h={200} field="pages"
                            title="# of pages read each month"/>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Bookshelf;