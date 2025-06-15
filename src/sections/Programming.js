import Gallery from '../components/Gallery.js'
import Impostar from "../assets/art/impostar.JPG"
import Portfolio from "../assets/art/portfolio.png";
import Tinderfy from "../assets/art/tinderfy.png";
import Test from '../assets/test.png';

function Programming() {
    const items = [
        [
            {
                name: "tinderfy",
                date: "2025",
                med: "web app (react + flask)",
                img: Tinderfy,
                link: "https://github.com/kath3rine/tinderfy-v2",
                desc: "spotify wrapped meets dating app! displays spotify analytics in a tinder profile"
            }
        ],
        [
            {
                name: "impost-AR",
                date: "2025",
                med: "augmented reality (unity)",
                img: Impostar,
                link: "https://sites.google.com/terpmail.umd.edu/emma-and-katherine-capstone",
                desc: "multiplayer AR escape room / scavenger hunt! players solve virtual and physical puzzles to uncover clues and figure out which player is the imposter"
            }
        ],
        [
            {
                name: "professional portfolio",
                date: "2025",
                med: "website (react)",
                img: Portfolio,
                link: "https://kath3rine.github.io"
            },
            
        ],
        [
            {
                name: "personal blog (this site!)",
                date: "2025",
                med: "website (react)",
                img: Test,
                link: "https://kath3rine.github.io/just4fun"
            }
        ]
    ]

    return (
        <div id='programming'>
            <h2><a href="https://kath3rine.github.io">
                full portfolio here
            </a></h2>
            <div className="window">
                <Gallery title="programming.py" pages={items}/>
            </div>
        </div>
    )
}
export default Programming;