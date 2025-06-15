import React, { useState } from 'react';
import Books from '../data/BookReviews.json'
import '../style/Bookshelf.css'

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
                <p>read: {book.date}</p>
                <p>{book.review}</p>
            </div>
                
            </div>
        </div>
        
    )
}

function Bookshelf() {
    return (
        <div id="bookshelf">
            <h1>2025 reads</h1>
            <p>click each book 2 see my thoughts</p>

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
        </div>
    )
}
export default Bookshelf;