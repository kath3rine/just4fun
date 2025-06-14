import books from '../data/BookData.json'
import '../style/Bookshelf.css'

function Book({book, c, index}) {
    return(
        <div className={c} id="book">
            <div className={book.rating} id="book-inside">
                <p>{index}</p>
                <p>{book.title}</p>
            </div>
        </div>
        
    )
}

function Bookshelf() {
    return (
        <div id="bookshelf">
            <div id="shelf">
                    {books.map((book, index) => (
                        <div>
                            { index > books.length - (books.length % 4) - 1  
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