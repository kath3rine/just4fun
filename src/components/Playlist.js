function Playlist({songs, title}) {

    return(
        <div style={{
            width: "400px",
            backgroundColor: "rgb(30, 30, 30)",
            borderLeft: "10px black solid",
            borderRight: "10px black solid",
            borderTop: "40px black solid",
            borderBottom: "40px black solid",
            borderRadius: "20px"
        }}>
            <h2 style={{margin: "10px", color: "white"}}>
                {title}
            </h2>
            {songs.map((song) => (
                <div>
                    <p style={{ color: "#bbb", margin: "0px 0px 0px 10px"}}>
                        {song.month}
                    </p>
                    <iframe style={{ border: "none", width: "100%", height: "80px"}} 
                    src={song.link}
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
                    loading="lazy"></iframe>
                </div>
            ))}
        </div>
    )
}
export default Playlist;