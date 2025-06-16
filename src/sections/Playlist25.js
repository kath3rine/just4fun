import Playlist from "../components/Playlist.js"
import Songs1 from '../data/Playlist2025p1.json'

function Playlist25() {
    return(
        <div id="playlist25">
            <Playlist songs={Songs1} title="2025 favorites part 1"/>
        </div>
    )
}
export default Playlist25