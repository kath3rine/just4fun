import Playlist from "../components/Playlist.tsx"
import Songs1 from '../data/Playlist2025p1.json'
import Songs2 from '../data/Playlist2025p2.json'

function Playlist25() {
    return(
        <div id="playlist25"
        style={{display: "flex"}}>
            <Playlist songs={Songs1} title="2025 favorites part 1"/>
            <Playlist songs={Songs2} title="2025 favorites part 2"/>
        </div>
    )
}
export default Playlist25