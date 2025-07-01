import THOHH from '../assets/filmjournal/thohh.png'
import BlackSwan from '../assets/filmjournal/blackswan.png'
import DOS from '../assets/filmjournal/500dos.png'

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
                <div style={{
                    backgroundColor: "black",
                    paddingTop: "15px",
                    height: "550px",
                    marginBottom: "10px"
                }}>
                    <div style={{
                        height: "495px",
                        borderTop: "15px white dashed",
                        borderBottom: "15px white dashed"
                    }}>
                        <div style={{
                            height: "425px",
                            width: "320px",
                            border: "10px black solid",
                            backgroundColor: "rgb(241, 242, 240)",
                            paddingBottom: "30px",
                            marginTop: "10px"
                        }}>
                            <img style={{ width: "100%", height: "auto" }} src={film.img}/>
                            <p style={{ textAlign: "center", marginTop: "0px", fontWeight: "bold"}}>
                                {film.name}
                            </p>
                        </div>
                    </div>
                </div>
                ))}
            </div>
        </div>
    )
}
export default FilmJournal;