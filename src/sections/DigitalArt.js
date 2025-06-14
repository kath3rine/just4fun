import Gallery from '../components/Gallery.js'
import Visualizer from "../assets/art/visualizer.png";

function DigitalArt() {
    const items = [
        {
            date: "2025",
            med: "touchdesigner",
            img: Visualizer,
            link: "https://drive.google.com/file/d/1BjeBTGx6p-eLK-zijbGXJCG2KZDsEStR/view?usp=sharing"
        }
    ]

    return (
        <div className="section">
            <h2>digital art</h2>
            <Gallery id="digital-art" 
            items={items}/>
        </div>
    );
}
export default DigitalArt