import Gallery from '../components/Gallery.js'
import Visualizer from "../assets/art/visualizer.png";

function DigitalArt() {
    const items = [
        {
            name: "fractal audio visualizer",
            date: "2025 |",
            med: "touchdesigner",
            img: Visualizer,
            desc: "Moving 3D fractal that changes its appearance in reaction to the rhythm and pitch of a song of the user's choosing",
            link: "https://drive.google.com/file/d/1BjeBTGx6p-eLK-zijbGXJCG2KZDsEStR/view?usp=sharing"
        }
    ]

    return (
        <div className="notebook" id="digital-art">
            <Gallery title="digital" pages={items} num={1}/>
        </div>
    )
}
export default DigitalArt;