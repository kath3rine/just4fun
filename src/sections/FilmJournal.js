import "../style/FilmJournal.css"
import THOHH from '../assets/journal/thohh.png'
import BlackSwan from '../assets/journal/blackswan.png'
import DOS from '../assets/journal/500dos.png'

function FilmCollage({film}) {
    return(
        <div id="film-collage">
            <div id="wrapper">
            <div id="film-item">
                <img src={film.img}/>
                <p>{film.name}</p>
            </div>
            </div>
        </div>
    )
}

function FilmJournal() {
    const items = [
        { name: "500 days of summer ", img: DOS },
        { name: "the haunting of hill house", img: THOHH },
        { name: "black swan", img: BlackSwan }
    ]

    return (
        <div className="section" id="film-journal">
            <h2> my letterboxd top {items.length} collages </h2>
            <div id="film-journal-content">
                {items.map((film) => (
                    <FilmCollage film={film}/>
                ))}
            </div>
        </div>
    )
}
export default FilmJournal;