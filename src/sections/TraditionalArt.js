import Gallery from '../components/Gallery.js'
import Face from "../assets/art/face.jpg";
import Fruit from "../assets/art/fruit.png";
import Panda from "../assets/art/panda.png";

function TraditionalArt() {
    const items = [
        {
            date: "2020",
            med: "colored pencil",
            img: Face
        },
        {
            date: "2020",
            med: "watercolor",
            img: Fruit
        },
        {
            date: "2021",
            med: "acrylic",
            img: Panda
        }
    ]

    return (
        <div className="section">
            <h2>traditional art</h2>
            <Gallery id="traditional-art" 
            items={items}/>
        </div>
    );
}
export default TraditionalArt