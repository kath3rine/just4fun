import Notebook from './Notebook.js'
import Visualizer from "../assets/art/visualizer.png";

function DigitalArt() {
    const pages = [
        [
            {
                date: "2025",
                med: "touchdesigner",
                img: Visualizer,
                link: "https://drive.google.com/file/d/1BjeBTGx6p-eLK-zijbGXJCG2KZDsEStR/view?usp=sharing"
            }
        ]
    ]

    return(
        <div className="art-section" id="digital-art">
            <Notebook 
                    title="digital"
                    pages={pages}/>
                </div>
    )
}
export default DigitalArt;