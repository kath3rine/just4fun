import Gallery from '../components/Gallery.js'
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
    const colors = {
        "notebook": "s1",
        "window": "s2"
    }
    const items = [
        {
            title: "traditional",
            type: "notebook",
            id: "traditional-art",
            items: [
                { date: "2020 |", med: "colored pencil", img: Face } ,
                { date: "2020 |", med: "colored pencil", img: Eye } ,
                { date: "2021 |", med: "acrylic", img: Panda } ,
                { date: "2020 |", med: "colored pencil + gouache", img: Mixed } ,
                { date: "2020 |", med: "colored pencil", img: Medal } ,
                { date: "2021 |", med: "watercolor", img: Fruit } 
            ]
        },
        {
            title: "digital",
            type: "notebook",
            id: "digital-art",
            items: [
                {
                    name: "fractal audio visualizer",
                    date: "2025 |",
                    med: "touchdesigner",
                    img: Visualizer,
                    desc: "Moving 3D fractal that changes its appearance in reaction to the rhythm and pitch of a song of the user's choosing",
                    link: "https://drive.google.com/file/d/1BjeBTGx6p-eLK-zijbGXJCG2KZDsEStR/view?usp=sharing"
                }
            ]
        },
        {
            title: "programming",
            type: "window",
            id: "programming",
            items: [
                {
                    name: "tinderfy",
                    date: "2025 |",
                    med: "web app (react + flask)",
                    img: Tinderfy,
                    link: "https://github.com/kath3rine/tinderfy-v2",
                    desc: "spotify wrapped meets dating app! displays spotify analytics in a tinder profile"
                },
                {
                    name: "impost-AR",
                    date: "2025 |",
                    med: "augmented reality (unity)",
                    img: Impostar,
                    link: "https://sites.google.com/terpmail.umd.edu/emma-and-katherine-capstone",
                    desc: "multiplayer AR escape room / scavenger hunt! players solve virtual and physical puzzles to uncover clues and figure out which player is the imposter"
                },
                {
                    name: "professional portfolio",
                    date: "2025 |",
                    med: "website (react)",
                    img: Portfolio,
                    link: "https://kath3rine.github.io"
                },
                {
                    name: "personal blog (this site!)",
                    date: "2025 |",
                    med: "website (react)",
                    img: Portfolio,
                    link: "https://kath3rine.github.io/just4fun"
                }
                
            ]
        }
    ]

    return (
        <div style={{display: "flex", flexWrap: "wrap"}}>
            { items.map((item, index) => (
                <div className={item.type} id={item.id}>
                    <Gallery title={item.title} 
                    pages={item.items} 
                    num={1} 
                    col={colors[item.type]}/>
                </div>
            ))}
        </div>
    )
}
export default Art;