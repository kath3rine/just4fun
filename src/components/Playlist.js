import '../style/Playlist.css'

function Playlist({songs, title}) {
    return(
        <div id="playlist">
            <h2>{title}</h2>
            {songs.map((song) => (
                <div id="song">
                    <p>{song.month}</p>
                    <iframe src={song.link}
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
                    loading="lazy"></iframe>
                </div>
            ))}
        </div>
    )
}
export default Playlist;