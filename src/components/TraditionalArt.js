import Notebook from '../components/Notebook.js'
import Face from "../assets/art/face.jpg";
import Fruit from "../assets/art/fruit.png";
import Panda from "../assets/art/panda.png";
import Eye from "../assets/art/eye.JPG";
import Medal from "../assets/art/medal.JPG";
import Mixed from "../assets/art/mixed.png";

function TraditionalArt() {
    const pages = [
        [ { date: "2020", med: "colored pencil", img: Face } ],
        [ { date: "2020", med: "colored pencil", img: Eye } ],
        [ { date: "2021", med: "acrylic", img: Panda } ],
        [ { date: "2020", med: "colored pencil + gouache", img: Mixed } ],
        [ { date: "2020", med: "colored pencil", img: Medal } ],
        [ { date: "2021", med: "watercolor", img: Fruit } ]
    ]

    return (
        <div className="art-section" id="traditional-art">
            <Notebook 
                title="traditional"
                pages={pages}/>
        </div>
    )
}
export default TraditionalArt