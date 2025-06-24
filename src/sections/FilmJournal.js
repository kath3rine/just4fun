import THOHH from '../assets/journal/thohh.png'
import BlackSwan from '../assets/journal/blackswan.png'
import DOS from '../assets/journal/500dos.png'

function FilmCollage({film}) {
    const style1 = {
        height: "425px",
        width: "320px",
        border: "10px black solid",
        backgroundColor: "rgb(241, 242, 240)",
        paddingBottom: "30px",
        marginTop: "10px"
    }

    const style1img = { width: "100%", height: "auto" }
    const style1p = { 
        textAlign: "center", marginTop: "0px", fontWeight: "bold"
    }
    const style2 = {
        height: "495px",
        borderTop: "15px white dashed",
        borderBottom: "15px white dashed"
      }
    const style3 = {
        backgroundColor: "black",
        paddingTop: "15px",
        height: "550px",
        marginBottom: "10px"
    }

    return(
        <div style={style3}>
            <div style={style2}>
            <div style={style1}>
                <img style={style1img} src={film.img}/>
                <p style={style1p}>{film.name}</p>
            </div>
            </div>
        </div>
    )
}

function FilmJournal() {
    const filmJournal = { borderTop: "1px #bbb solid", marginTop: "30px" }
    const filmJournalContent = { display: "flex", flexWrap: "wrap" }
    const items = [
        { name: "500 days of summer ", img: DOS },
        { name: "the haunting of hill house", img: THOHH },
        { name: "black swan", img: BlackSwan }
    ]

    return (
        <div className="section" style={filmJournal}>
            <h2> my letterboxd top {items.length} collages </h2>
            <div style={filmJournalContent}>
                {items.map((film) => (
                    <FilmCollage film={film}/>
                ))}
            </div>
        </div>
    )
}
export default FilmJournal;