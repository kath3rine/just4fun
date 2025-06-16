import Gallery from '../components/Gallery.js';
import THOHH from '../assets/journal/thohh.png'
import BlackSwan from '../assets/journal/blackswan.png'
import DOS from '../assets/journal/500dos.png'

function FilmJournal() {
    const items = [
        { name: "500 days of summer ", img: DOS },
        { name: "the haunting of hill house", img: THOHH },
        { name: "black swan", img: BlackSwan }
    ]

    return (
        <div className="reel" id="film-journal">
            <h2>some of my favorite films / shows </h2>
            <Gallery pages={items} num={2}/>
        </div>
    )
}
export default FilmJournal;