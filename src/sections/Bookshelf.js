import React, { useState } from 'react';
import Books from '../data/BookReviews.json'
import '../style/Bookshelf.css'
import RatingBar from '../components/RatingBar';
import MyPie from '../charts/MyPie';
import RatingChart from '../charts/RatingChart';
import StackedBarGraph from '../charts/StackedBarGraph'
import BarGraph from '../charts/BarGraph';

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
    const h = 250
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

      const genreStats = Books.reduce((acc, { genre, points }) => {
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
    
    return (
        <div id="bookshelf">
            <h1>my 2025 bookshelf</h1>
            <RatingBar/>
            <div id="bookshelf-content" 
            style={{display: "flex"}}>
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
                <div className="charts"
                    style={{display: "flex", flexWrap: "wrap", width: "700px"}}>
                
                <MyPie palette={COLORS}
                    categories={genreLst}
                    w={w} h={h} 
                    lst={Books} 
                    k='genre'/>
                
                <BarGraph title="avg rating by genre"
                    palette={COLORS}
                    w={w} h={h}
                    dataIn={genreStatsData}
                    xaxis="genre"
                    bar="avgPoints"/>

                <RatingChart palette={COLORS}
                    w={w} h={h} 
                    lst={Books}/>
                        
                <BarGraph title="pages read each month"
                    w={w} h={h} 
                    xaxis="month" 
                    col={COLORS[0]}
                    bar="pages" 
                    dataIn={pageData}/>
                </div>
            </div>
        </div>
    )
}
export default Bookshelf;