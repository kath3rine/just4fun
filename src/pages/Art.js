import '../style/Art.css'
import Notebook from '../components/Notebook.js'
import Face from "../assets/art/face.jpg";
import Fruit from "../assets/art/fruit.png";
import Panda from "../assets/art/panda.png";
import Eye from "../assets/art/eye.JPG";
import Medal from "../assets/art/medal.JPG";
import Mixed from "../assets/art/mixed.png";
import Visualizer from "../assets/art/visualizer.png";
import Impostar from "../assets/art/impostar.JPG"
import Portfolio from "../assets/art/portfolio.png";
import Tinderfy from "../assets/art/tinderfy.png";

function Art() {
    const traditional = [
        [ { date: "2020", med: "colored pencil", img: Face } ],
        [ { date: "2020", med: "colored pencil", img: Eye } ],
        [ { date: "2021", med: "acrylic", img: Panda } ],
        [ { date: "2020", med: "colored pencil + gouache", img: Mixed } ],
        [ { date: "2020", med: "colored pencil", img: Medal } ],
        [ { date: "2021", med: "watercolor", img: Fruit } ]
    ]

    const digital = [
        [
            {
                name: "fractal audio visualizer",
                date: "2025",
                med: "touchdesigner",
                img: Visualizer,
                desc: "Moving 3D fractal that changes its appearance in reaction to the rhythm and pitch of a song of the user's choosing",
                link: "https://drive.google.com/file/d/1BjeBTGx6p-eLK-zijbGXJCG2KZDsEStR/view?usp=sharing"
            }
        ]
    ]

    const programming = [
        [
            {
                name: "tinderfy",
                date: "2025",
                med: "web app (react + flask)",
                img: Tinderfy,
                link: "github.com/kath3rine/tinderfy-v2",
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
            {
                name: "personal blog (this site!)",
                date: "2025",
                med: "website (react)",
                img: Portfolio,
                link: "https://kath3rine.github.io/just4fun",
                desc: "design, code, illustrations, 3d models etc. all from scratch by me"
            }
        ],
    ]

    return (
        <div className="section" id="art">
            <div id="notebooks">
                <div className="art-section" id="traditional-art">
                    <Notebook 
                    title="traditional"
                    pages={traditional}/>
                </div>

                <div className="art-section" id="digital-art">
                    <Notebook 
                    title="digital"
                    pages={digital}/>
                </div>

                <div className="art-section" id="programming">
                    <Notebook 
                    title="programming"
                    pages={programming}/>
                </div>
            </div>
        </div>
    )
}
export default Art